export class CreateInventoryDto {
    codeArticle: string;
    optimalBatch: number;
    reorderPoint: number;
    safetyStock: number;
    CGI: number;
    currentStock: number;
    storageCost: number;
    maxQuantity: number;
    orderQuantity: number;
    orderInterval: number;
}
