import {Injectable} from '@nestjs/common';
import {CreateSaleDto} from './dto/create-sale.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '../article/entities/article.entity';
import {Repository} from 'typeorm';
import {Inventory} from '../article/entities/inventory.entity';
import {Sale} from './entities/sale.entity';
import {SaleArticle} from './entities/saleArticle.entity';
import * as moment from 'moment';
import {InventoryModelEnum} from '../article/enum/inventoryModel.enum';
import {Provider} from '../provider/entities/provider.entity';
import {ArticleProvider} from '../provider/entities/article-provider.entity';
import {PurchaseOrder} from '../purchase-order/entities/purchase-order.entity';
import {OrderStatusEnum} from '../purchase-order/enum/order-status.enum';

@Injectable()
export class SalesService {
    constructor(@InjectRepository(Article)
                private articleRepository: Repository<Article>,
                @InjectRepository(Inventory)
                private inventoryRepository: Repository<Inventory>,
                @InjectRepository(Sale)
                private saleRepository: Repository<Sale>,
                @InjectRepository(SaleArticle)
                private saleArticleRepository: Repository<SaleArticle>,
                @InjectRepository(Provider)
                private providerRepository: Repository<Provider>,
                @InjectRepository(ArticleProvider)
                private articleProviderRepository: Repository<ArticleProvider>,
                @InjectRepository(PurchaseOrder)
                private purchaseOrderRepository: Repository<PurchaseOrder>) {
    }

    async create(createSaleDto: CreateSaleDto) {
        // generate random code
        const prefix = 'SAL';
        const randomNumber = Math.floor(1000 + Math.random() * 9000);

        const sale = this.saleRepository.create({
            total: createSaleDto.total,
            date: new Date(),
            code: `${prefix}-${randomNumber}`,
        });

        const saleSaved = await this.saleRepository.save(sale);
        const saleArticles: SaleArticle[] = [];

        for (const article of createSaleDto.articles) {
            await this.reduceArticleStock(article.articleId, article.quantity)

            const articleEntity = await this.articleRepository.findOne({where: {id: article.articleId}});

            if (articleEntity) {
                const saleArticle = await this.createSaleArticles(articleEntity, sale, article.quantity);
                saleArticles.push(saleArticle);
            }

        }

        saleSaved.saleArticles = saleArticles;
        const salePersist = await this.saleRepository.save(saleSaved);
        const ordersCreated = [];
        for (const saleArticle of salePersist.saleArticles) {
            const order = await this.validateArticleStock(saleArticle.article.id);
            ordersCreated.push(...order);
        }
        return {salePersist, ordersCreated};
    }

    async validateArticleStock(articleId: number) {
        const validationStock = await this.calculateQuantity(articleId);
        const orders = [];
        if (validationStock > 0) {
            const ordersGenerated = await this.purchaseOrderRepository.findOne({
                where: {
                    article: {id: articleId},
                    status: OrderStatusEnum.PENDING
                }
            });
            if (ordersGenerated) {
                ordersGenerated.quantity = validationStock;
                const oldOrderUpdated = await this.purchaseOrderRepository.save(ordersGenerated);
                orders.push({order: oldOrderUpdated, status: 'updated'});
            } else {
                const newOrder = await this.generatePurchaseOrder(articleId, validationStock);
                orders.push({order: newOrder, status: 'created'});
            }
        }
        return orders;
    }


    async calculateQuantity(articleId: number): Promise<number> {
        const article = await this.articleRepository.findOne({where: {id: articleId}, relations: ['inventory']});
        return article.inventoryModel === InventoryModelEnum.INTERVALO_FIJO ? this.calculateFixInterval(article) : this.calculateFixLot(article);
    }

    calculateFixLot(article: Article): number {
        return (article.inventory.reorderPoint > article.inventory.currentStock) ? (article.inventory.optimalBatch - article.inventory.currentStock) : 0;
    }


    async createSaleArticles(article: Article, sale: Sale, quantity: number) {
        const saleArtSaved = this.saleArticleRepository.create({
            article: article,
            sale: sale,
            quantity: quantity
        });
        return this.saleArticleRepository.save(saleArtSaved);
    }

    async createPastsSales() {

        const articleIds = await this.articleRepository.find().then(articles => articles.map(article => article.id));
        const sales: Sale[] = [];
        const startDate = moment().subtract(3, 'year').startOf('day');
        const endDate = moment().startOf('day');
        if (articleIds && articleIds.length > 0) {
            while (startDate.isBefore(endDate)) {
                const numberOfSales = Math.floor(Math.random() * 5); // Número aleatorio de ventas por día
                for (let i = 0; i < numberOfSales; i++) {
                    const saleDate = startDate.clone().add(Math.random() * 24, 'hours').toDate();
                    const randomArticleId = articleIds[Math.floor(Math.random() * articleIds.length)];
                    const quantity = Math.floor(Math.random() * 10) + 1; // Cantidad aleatoria de venta

                    const sale = this.saleRepository.create({
                        code: `SAL-${Math.floor(1000 + Math.random() * 9000)}`,
                        date: saleDate,
                        total: quantity * 100, // Suponiendo un precio unitario de 100 para simplicidad
                    });

                    const savedSale = await this.saleRepository.save(sale);

                    const saleArticle = this.saleArticleRepository.create({
                        sale: savedSale,
                        article: await this.articleRepository.findOne({where: {id: randomArticleId}}),
                        quantity: quantity,
                    });

                    await this.saleArticleRepository.save(saleArticle);

                    sales.push(savedSale);
                }
                startDate.add(1, 'day');
            }

        }

        return sales;

    }

    async createFutureSales() {

        const articleIds = [1, 2, 3]; // Ejemplo de IDs de artículos
        const sales: Sale[] = [];

        const startDate = moment().startOf('day');
        const endDate = moment().add(1, 'year').endOf('day');

        while (endDate.isAfter(startDate)) {
            const numberOfSales = Math.floor(Math.random() * 5); // Número aleatorio de ventas por día
            for (let i = 0; i < numberOfSales; i++) {
                const saleDate = startDate.clone().add(Math.random() * 24, 'hours').toDate();
                const randomArticleId = articleIds[Math.floor(Math.random() * articleIds.length)];
                const quantity = Math.floor(Math.random() * 10) + 1; // Cantidad aleatoria de venta

                const sale = this.saleRepository.create({
                    code: `SAL-${Math.floor(1000 + Math.random() * 9000)}`,
                    date: saleDate,
                    total: quantity * 100, // Suponiendo un precio unitario de 100 para simplicidad
                });

                const savedSale = await this.saleRepository.save(sale);

                const saleArticle = this.saleArticleRepository.create({
                    sale: savedSale,
                    article: await this.articleRepository.findOne({where: {id: randomArticleId}}),
                    quantity: quantity,
                });

                await this.saleArticleRepository.save(saleArticle);

                sales.push(savedSale);
            }
            startDate.add(1, 'day');
        }

        return sales;


    }


    async reduceArticleStock(articleId: number, quantity: number) {
        const inventory = await this.inventoryRepository.findOne({where: {article: {id: articleId}}});
        return this.inventoryRepository.update(inventory.id, {currentStock: inventory.currentStock - quantity});
    }

    async findAll() {
        // return order by date desc
        return this.saleRepository.find({order: {date: 'DESC'}});
    }

    findAllSaleArticles() {
        return this.saleArticleRepository.find();
    }

    async removeAll(): Promise<void> {
        await this.saleRepository.query('SET FOREIGN_KEY_CHECKS = 0')
        await this.saleArticleRepository.clear();
        await this.saleRepository.clear();

    }

    async generatePurchaseOrder(articleId: number, quantity: number) {
        const article = await this.articleRepository.findOne({where: {id: articleId}});
        const provider = await this.getProvidersByArticleId(articleId);

        if (!article || !provider) {
            throw new Error('Article or Provider not found');
        }
        const total = await this.calculateTotal(articleId, provider.id, quantity);

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


    private async getProvidersByArticleId(articleId: number): Promise<Provider> {
        const article = await this.articleRepository.findOne({
            where: {id: articleId},
            relations: ['articleProviders', 'articleProviders.provider']
        });
        return article.articleProviders.sort((a, b) => a.priority - b.priority).map(ap => ap.provider)[0];
    }


    private async calculateTotal(articleId: number, providerId: number, quantity: number) {
        const article = await this.articleRepository.findOne({where: {id: articleId}});
        const provider = await this.providerRepository.findOne({where: {id: providerId}});
        const articleProvider = await this.articleProviderRepository.findOne({where: {article, provider}});
        return articleProvider.purchasePrice * quantity;
    }

    private calculateFixInterval(article: Article) {
        return (article.inventory.safetyStock > article.inventory.currentStock) ? (article.inventory.maxQuantity - article.inventory.currentStock) : 0;
    }
}
