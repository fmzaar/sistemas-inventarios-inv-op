import {Module} from '@nestjs/common';
import {DemandService} from './demand.service';
import {DemandController} from './demand.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Demand} from './entities/demand.entity';
import {Article} from 'src/article/entities/article.entity';
import {DemandPrediction} from 'src/demand-prediction/entities/demand-prediction.entity';
import {PredictionConfigService} from 'src/prediction-config/prediction-config.service';
import {PredictionConfig} from 'src/prediction-config/entities/prediction-config.entity';
import {Sale} from 'src/sales/entities/sale.entity';
import {SaleArticle} from 'src/sales/entities/saleArticle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Demand, Article, DemandPrediction, PredictionConfig, Sale, SaleArticle])],
    controllers: [DemandController],
    providers: [DemandService, PredictionConfigService],
})
export class DemandModule {
}
