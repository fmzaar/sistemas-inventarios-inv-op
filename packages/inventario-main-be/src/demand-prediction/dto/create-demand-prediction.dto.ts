export class CreateDemandPredictionDto {
    articleCode: string;
    period: number;
    predictedQuantity: number;
    method: string;
    error: number;
}
