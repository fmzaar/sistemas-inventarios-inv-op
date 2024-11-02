export class CreateInventoryDto {
    codeArticle: string;
    optimalBatch: number;
    reorderPoint: number;
    actualStock:number;
    safetyStock: number;
    CGI: number;
}
