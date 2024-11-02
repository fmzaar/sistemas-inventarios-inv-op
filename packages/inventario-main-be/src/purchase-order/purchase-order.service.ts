import {Injectable} from '@nestjs/common';
import {CreatePurchaseOrderDto} from './dto/create-purchase-order.dto';
import {PurchaseOrder} from './entities/purchase-order.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '../article/entities/article.entity';
import {Provider} from '../provider/entities/provider.entity';
import {ArticleProvider} from '../provider/entities/article-provider.entity';
import {InventoryModelEnum} from '../article/enum/inventoryModel.enum';
import {OrderStatusEnum} from '../purchase-order/enum/order-status.enum';

@Injectable()
export class PurchaseOrderService {
    constructor(
        @InjectRepository(PurchaseOrder)
        private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>,
        @InjectRepository(ArticleProvider)
        private readonly articleProviderRepository: Repository<ArticleProvider>,
    ) {
    }

    async createManualOrder(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
        const {articleId, providerId} = createPurchaseOrderDto;
        const article = await this.articleRepository.findOne({where: {id: articleId}});
        const provider = await this.providerRepository.findOne({where: {id: providerId}});
        if (!article || !provider) {
            throw new Error('Article or Provider not found');
        }
        const quantity = await this.calculateQuantity(articleId);
        const total = await this.calculateTotal(articleId, providerId, quantity);

        const code = `PO-${Math.floor(1000 + Math.random() * 9000)}`;
        const purchaseOrder = this.purchaseOrderRepository.create({
            article,
            quantity,
            provider,
            code,
            total
        });
        return this.purchaseOrderRepository.save(purchaseOrder);
    }

    async getArticleDropdown(): Promise<Article[]> {
        return this.articleRepository.find();
    }

    async getArticleById(id: number): Promise<Article> {
        return this.articleRepository.findOne({where: {id}});
    }

    async getProvidersByArticleId(id: number): Promise<Provider[]> {
        const article = await this.articleRepository.findOne({
            where: {id},
            relations: ['articleProviders', 'articleProviders.provider']
        });
        return article.articleProviders.sort((a, b) => a.priority - b.priority).map(ap => ap.provider);
    }

    async findAll(): Promise<PurchaseOrder[]> {
        const orders = await this.purchaseOrderRepository.find({relations: ['article', 'provider']});
        return orders;
    }

    async calculateQuantity(articleId: number): Promise<number> {
        const article = await this.articleRepository.findOne({where: {id: articleId}, relations: ['inventory']});
        return article.inventoryModel === InventoryModelEnum.INTERVALO_FIJO ? article.inventory.maxQuantity : this.calculateFixLot(article);
    }

    calculateFixLot(article: Article): number {
        return (article.inventory.reorderPoint > article.inventory.currentStock) ? (article.inventory.optimalBatch - article.inventory.currentStock) : 0;
    }

    private async calculateTotal(articleId: number, providerId: number, quantity: number) {
        const article = await this.articleRepository.findOne({where: {id: articleId}});
        const provider = await this.providerRepository.findOne({where: {id: providerId}});
        const articleProvider = await this.articleProviderRepository.findOne({where: {article, provider}});
        return articleProvider.purchasePrice * quantity;
    }

    async cancelOrderStatus(orderId: number): Promise<any> {
        const order = await this.purchaseOrderRepository.findOne({where: {id: orderId}});
        if (!order) {
            throw new Error('Order not found');
        }
        order.status = OrderStatusEnum.CANCELLED;
        await this.purchaseOrderRepository.save(order)
    }

    async completeOrderStatus(orderId: number): Promise<any> {
        const order = await this.purchaseOrderRepository.findOne({
            where: {id: orderId},
            relations: ['article', 'provider']
        });
        let articleId = order.article.id
        const article = await this.articleRepository.findOne({where: {id: articleId}, relations: ['inventory']});
        if (!article || !order) {
            throw new Error('Article or Order not found');
        }
        order.status = OrderStatusEnum.FINISHED;
        article.inventory.currentStock = article.inventory.currentStock + order.quantity
        await this.articleRepository.save(article)
        await this.purchaseOrderRepository.save(order)
    }
}
