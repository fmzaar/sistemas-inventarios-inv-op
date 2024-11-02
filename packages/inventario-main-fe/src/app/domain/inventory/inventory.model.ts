export interface Inventory {
  optimalBatch: number;
  reorderPoint: number;
  safetyStock: number;
  CGI: number;
  codeArticle?: string;
  currentStock: number;
  storageCost: number;
  orderCost: number;
  maxQuantity: number;
  orderQuantity: number;
}
