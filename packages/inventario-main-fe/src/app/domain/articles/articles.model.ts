import {Inventory} from '../inventory/inventory.model';

export interface Article {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  inventoryModel: string;
  inventory: Inventory;
}

export interface NewArticle {
  code: string;
  name: string;
  description: string;
  price: number;
  inventoryModel: string;
}

