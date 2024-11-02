export class CreateSaleDto {
    total: number;
    articles: ArticleSale[];
}

interface ArticleSale {
    articleId: number;
    quantity: number;
}
