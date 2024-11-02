export class PredictionDto {

    articleCode: string;

    weights: number[];
    periodsToUse: number;

    alpha: number;
    initialForecast: number;

    nextYearPredict: number;


}
