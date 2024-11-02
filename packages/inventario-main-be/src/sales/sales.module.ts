import {Module} from '@nestjs/common';
import {SalesService} from './sales.service';
import {SalesController} from './sales.controller';
import {Sale} from './entities/sale.entity';
import {Article} from '../article/entities/article.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Inventory} from '../article/entities/inventory.entity';
import {SaleArticle} from './entities/saleArticle.entity';
import {ArticleProvider} from '../provider/entities/article-provider.entity';
import {Provider} from '../provider/entities/provider.entity';
import {PurchaseOrder} from '../purchase-order/entities/purchase-order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sale, Article, Inventory, SaleArticle, PurchaseOrder, Provider, ArticleProvider]),
    ],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule {
}
