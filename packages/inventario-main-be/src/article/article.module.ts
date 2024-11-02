import {Module} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ArticleController} from './article.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from './entities/article.entity';
import {Inventory} from './entities/inventory.entity';
import {PurchaseOrder} from '../purchase-order/entities/purchase-order.entity';
import {Demand} from '../demand/entities/demand.entity';
import {DemandPrediction} from '../demand-prediction/entities/demand-prediction.entity';
import {Sale} from '../sales/entities/sale.entity';
import {Provider} from '../provider/entities/provider.entity';
import {InventoryService} from './inventory.service';
import {ArticleProvider} from '../provider/entities/article-provider.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Article, Inventory, PurchaseOrder, Demand, DemandPrediction, Sale, Provider, ArticleProvider]),
    ],
    controllers: [ArticleController],
    providers: [ArticleService, InventoryService],
})
export class ArticleModule {
}
