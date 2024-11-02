import {PartialType} from '@nestjs/swagger';
import {CreatePredictionConfigDto} from './create-prediction-config.dto';

export class UpdatePredictionConfigDto extends PartialType(CreatePredictionConfigDto) {
  periodsToPredict?: number;
    predictionInterval?: string;
  errorCalculationMethod?: string;
  acceptableError?: number;
}
