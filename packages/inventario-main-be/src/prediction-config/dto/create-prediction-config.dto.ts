export class CreatePredictionConfigDto {
  periodsToPredict: number;
    DataStartDate: string;
    DataEndDate: string;
    predictionInterval: string;
  errorCalculationMethod: string;
  acceptableError: number;
}
