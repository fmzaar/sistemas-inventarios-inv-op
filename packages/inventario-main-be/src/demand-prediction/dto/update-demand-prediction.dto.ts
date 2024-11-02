import {PartialType} from '@nestjs/swagger';
import {CreateDemandPredictionDto} from './create-demand-prediction.dto';

export class UpdateDemandPredictionDto extends PartialType(CreateDemandPredictionDto) {
    articleCode?: string;
    period?: number;
    predictedQuantity?: number;
    method?: string;
    error?: number;
}
