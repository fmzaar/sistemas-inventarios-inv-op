import { Article } from "src/article/entities/article.entity";

export class CreateDemandDto {
    articleCode: string;
    interval: string;
    startDate: string;
    endDate: string;

}
