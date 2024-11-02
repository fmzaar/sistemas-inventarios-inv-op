import {Module} from '@nestjs/common';
import {PurchaseOrderService} from './purchase-order.service';
import {PurchaseOrderController} from './purchase-order.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PurchaseOrder} from './entities/purchase-order.entity';
import {Article} from '../article/entities/article.entity';
import {Provider} from '../provider/entities/provider.entity';
import {ArticleProvider} from '../provider/entities/article-provider.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PurchaseOrder, Article, Provider, ArticleProvider])],
    controllers: [PurchaseOrderController],
    providers: [PurchaseOrderService],
})
export class PurchaseOrderModule {
}
