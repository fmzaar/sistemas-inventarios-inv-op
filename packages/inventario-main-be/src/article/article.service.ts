import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ConfigInventory } from './dto/config-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { ArticleProvider } from 'src/provider/entities/article-provider.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Demand } from 'src/demand/entities/demand.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
        @InjectRepository(Inventory)
        private inventoryRepository: Repository<Inventory>,
        @InjectRepository(ArticleProvider)
        private articleProviderRepository: Repository<ArticleProvider>,
        @InjectRepository(Demand)
        private demandRepository: Repository<Demand>
    ) {
    }

    findAll(): Promise<Article[]> {
        return this.articleRepository.find({ relations: ['inventory'] });
    }

    findOne(id: number): Promise<Article> {
        return this.articleRepository.findOneBy({ id });
    }


    async create(article: CreateArticleDto): Promise<Article> {
        try {
            if (await this.checkIfCodeExists(article.code)) {
                throw new BadRequestException('El código del artículo ya existe');
            }
            if (await this.checkIfNameExists(article.name)) {
                throw new BadRequestException('El nombre del artículo ya existe');
            }
            const newArticle = await this.articleRepository.save(article);
            const newInventory = await this.inventoryRepository.create();
            newArticle.inventory = newInventory;
            return this.articleRepository.save(newArticle);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async update(id: number, article: UpdateArticleDto): Promise<Article> {

        if (article.code) {
            const existingArticle = await this.articleRepository.findOne({ where: { code: article.code } });

            if (existingArticle.id == id) {
                await this.articleRepository.update(id, article);
                return this.findOne(id);
            } else {
                throw new BadRequestException('Not updating right')
            }
        }


    }

    async remove(id: number): Promise<void> {
        await this.articleRepository.delete(id);
    }


    async checkIfCodeExists(code: string): Promise<boolean> {
        const article = await this.articleRepository.findOne({ where: { code } });
        return !!article;
    }

    async checkIfNameExists(name: string): Promise<boolean> {
        const article = await this.articleRepository.findOne({ where: { name } });
        return !!article;
    }

    async configInventory(configInventory: ConfigInventory): Promise<Article> {
        const article = await this.articleRepository.findOne({
            where: { code: configInventory.codeArticle },
            relations: ['inventory']
        });
        const inventory = this.inventoryRepository.create(configInventory);
        article.inventory = { ...article.inventory, ...inventory };
        return this.articleRepository.save(article);
    }

    async calculateFixedLot(articleId: number): Promise<any> {
        try {
            const cgi = await this.calculateCGI(articleId)
            const loteOptimo = await this.calculateEOQ(articleId)
            const puntoPedido = await this.calculateROP(articleId)
            const stockSeguridad = await this.calculateSecurityStock(articleId)

            return { cgi, loteOptimo, puntoPedido, stockSeguridad };

        } catch (error) {
            console.error("Error al calcular el intervalo fijo:", error);
            throw error;
        }


    }
    async calculateFixedInterval(articleId: number): Promise<any> {
        try {
            const safetyStock = await this.calculateSecurityStock(articleId);
            const maxQuantity = await this.calculateMaxQuantity(articleId);
            const orderQuantity = await this.calculateOrderQuantity(articleId);

            return { safetyStock, maxQuantity, orderQuantity };

        } catch (error) {
            console.error("Error al calcular el intervalo fijo:", error);
            throw error;
        }
    }


    async calculateSecurityStock(articleId: number): Promise<any> {
        const article = await this.articleRepository.findOne({ where: { id: articleId }, relations: ['inventory', "articleProviders"] });
        const provider = await this.articleProviderRepository.findOne({ where: { article: { id: articleId } }, });
        let Z = 1.67; //95%
        let desviacion = 1; //Sugerida por el profesor
        let demora = provider.daysDelay;
        let tiempoEntrePedidos = article.inventory.orderInterval;
        let stockSeguridad = 0;
        let inventoryModel = article.inventoryModel
        if (inventoryModel === 'LOTE_FIJO') {
            stockSeguridad = (Z * desviacion * Math.sqrt(demora))

        } else {
            stockSeguridad = Math.round(Z * desviacion * Math.sqrt(tiempoEntrePedidos + demora))
        }
        article.inventory.safetyStock = stockSeguridad;
        await this.articleRepository.save(article);

        return stockSeguridad;
    }

    async calculateMaxQuantity(articleId: number): Promise<any> {

        const article = await this.articleRepository.findOne({ where: { id: articleId }, relations: ['inventory'] });
        const demand = await this.demandRepository.findOne({ where: { article: { id: articleId }, interval: 'yearly' } });
        let maxQ = 0;
        let stockSeguridad = article.inventory.safetyStock;
        let tiempoEntrePedidos = article.inventory.orderInterval;
        let demandaAnual = demand.quantity; //Hardcodeado de demanda, cambiar
        let demandaDiaria = demandaAnual / 250; //250 es un aprox de los dias laborales. capaz cambiar por 365?
        if (article.inventoryModel === 'INTERVALO_FIJO') {
            maxQ = Math.round(demandaDiaria * (tiempoEntrePedidos + stockSeguridad))
        } else {
            throw new BadRequestException('Solo es posible calcular la cantidad Maxima en modelos de Intervalo Fijo')
        }
        article.inventory.maxQuantity = maxQ;
        await this.articleRepository.save(article);
        return maxQ;

    }

    async calculateOrderQuantity(articleId: number): Promise<any> {
        const article = await this.articleRepository.findOne({ where: { id: articleId }, relations: ['inventory'] });
        let orderQuantity = 0;
        let maxQ = article.inventory.maxQuantity;
        let stockActual = article.inventory.currentStock;


        if (article.inventoryModel == 'INTERVALO_FIJO') {
            orderQuantity = (maxQ - stockActual);
        } else {
            throw new BadRequestException('Solo es posible calcular la cantidad Maxima en modelos de Intervalo Fijo')
        }
        article.inventory.orderQuantity = orderQuantity;
        await this.articleRepository.save(article)
        return orderQuantity;

    }

    async calculateEOQ(articleId: number): Promise<any> {
        const article = await this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.inventory', 'inventory')
            .where('article.id = :articleId', { articleId })
            .getOne();

        if (!article || !article.inventory || article.inventoryModel == "INTERVALO_FIJO") {
            throw new
                BadRequestException('Artículo o inventario no encontrado o articulo de Intervalo Fijo');
        }
        const demand = await this.demandRepository.findOne({ where: { article: { id: articleId }, interval: 'yearly' } });
        let costoPedido = article.inventory.orderCost
        let costoAlmacenamiento = article.inventory.storageCost
        let demandaAnual = demand.quantity
        let eoq = Math.sqrt((2 * costoPedido * demandaAnual) / costoAlmacenamiento)

        article.inventory.optimalBatch = eoq
        await this.articleRepository.save(article)
        return eoq;
    }

    async calculateStorageCost(articleId: number): Promise<any> {
        const article = await this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.inventory', 'inventory')
            .where('article.id = :articleId', { articleId })
            .getOne();

        if (!article || !article.inventory || article.inventoryModel == "INTERVALO_FIJO") {
            throw new
                BadRequestException('Artículo o inventario no encontrado o articulo de Intervalo Fijo');
        }

        let costoOrden = article.inventory.orderCost
        let eoq = article.inventory.optimalBatch
        let averageInventoryLevel = eoq / 2
        let costoOrdenTotal = averageInventoryLevel * costoOrden

        return costoOrdenTotal;

    }

    async calculateROP(articleId: number): Promise<any> {
        const article = await this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.inventory', 'inventory')
            .where('article.id = :articleId', { articleId })
            .getOne();

        if (!article || !article.inventory || article.inventoryModel == "INTERVALO_FIJO") {
            throw new
                BadRequestException('Artículo o inventario no encontrado o articulo de Intervalo Fijo');
        }
        const demand = await this.demandRepository.findOne({ where: { article: { id: articleId }, interval: 'yearly' } });
        const provider = await this.articleProviderRepository.findOne({ where: { article: { id: articleId } }, });

        let demandaAnual = demand.quantity
        let demandaDiaria = demandaAnual / 250 //250 aprox dias laborales
        let diasDemora = provider.daysDelay;
        let rop = demandaDiaria * diasDemora;

        article.inventory.reorderPoint = rop;
        await this.articleRepository.save(article)
        return rop;
    }

    async calculateCGI(articleId: number): Promise<any> {
        const article = await this.articleRepository.createQueryBuilder('article')
            .leftJoinAndSelect('article.inventory', 'inventory')
            .where('article.id = :articleId', { articleId })
            .getOne();

        if (!article || !article.inventory || article.inventoryModel == "INTERVALO_FIJO") {
            throw new
                BadRequestException('Artículo o inventario no encontrado o articulo de Intervalo Fijo');
        }
        const demand = await this.demandRepository.findOne({ where: { article: { id: articleId }, interval: 'yearly' } });

        let precio = article.price
        let demandaAnual = demand.quantity
        const costoAlmacenamiento = await this.calculateStorageCost(articleId)
        let eoq = article.inventory.optimalBatch
        let costoPedido = article.inventory.orderCost
        let cgi = ((precio * demandaAnual) + (costoAlmacenamiento * eoq / 2) + (costoPedido * demandaAnual / eoq))

        article.inventory.CGI = cgi;
        await this.articleRepository.save(article);

        return cgi;

    }

    async getLowStockArticles(): Promise<any> {
        return await this.articleRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.inventory', 'inventory')
            .where('inventory.currentStock <= inventory.safetyStock')
            .getMany();
    }

    async getBelowROP(): Promise<any> { //FALTA VALIDAR QUE NO TENGA ORDEN DE COMPRA ACTIVA
        return await this.articleRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.inventory', 'inventory')
            .where('inventory.currentStock <= inventory.reorderPoint')
            .getMany();
    }


}
