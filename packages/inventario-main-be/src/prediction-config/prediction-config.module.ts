import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PredictionConfigService} from './prediction-config.service';
import {PredictionConfigController} from './prediction-config.controller';
import {PredictionConfig} from './entities/prediction-config.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PredictionConfig])],
    providers: [PredictionConfigService],
    controllers: [PredictionConfigController],
})
export class PredictionConfigModule {
}
