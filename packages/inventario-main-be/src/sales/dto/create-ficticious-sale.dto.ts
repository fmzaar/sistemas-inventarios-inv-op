export class CreateFictitiousSaleDto {
    total: number;
    date: Date;
    articles: ArticleSale[];
}

interface ArticleSale {
    articleId: number;
    quantity: number;
}
