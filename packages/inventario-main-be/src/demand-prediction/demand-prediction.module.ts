import {Module} from '@nestjs/common';
import {DemandPredictionService} from './demand-prediction.service';
import {DemandPredictionController} from './demand-prediction.controller';
import {Article} from 'src/article/entities/article.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Demand} from 'src/demand/entities/demand.entity';
import {DemandPrediction} from './entities/demand-prediction.entity';
import {PredictionConfig} from 'src/prediction-config/entities/prediction-config.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DemandPrediction, Article, Demand, PredictionConfig])],
    controllers: [DemandPredictionController],
    providers: [DemandPredictionService],
})
export class DemandPredictionModule {
}
