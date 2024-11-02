export class CalculateInventoryDto {
    articleId: number;
    demandRate: number; // Tasa de demanda (unidades por período)
    leadTime: number; // Tiempo de entrega en períodos
}