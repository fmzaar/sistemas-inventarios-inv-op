import {Article} from '../articles/articles.model';

export interface Sale {
  id: number;
  date: string;
  total: number;
  code: string;
  articles: Article[];
}

export interface NewSale {
  total: number;
  articles: ArticleSale[];
}

export interface ArticleSale {
  articleId: number;
  quantity: number;
}

export interface ArticleDropdown {
  id: number;
  code: string;
  name: string;
  price: number;
  inventory: { currentStock: number; }
}

interface ArticleResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  inventoryModel: string;
  price: string;
}

interface SaleResponse {
  id: number;
  code: string;
  date: string;
  total: number;
}

interface SaleArticleResponse {
  quantity: number;
  sale: SaleResponse;
  article: ArticleResponse;
  id: number;
}

interface SalePersistResponse {
  code: string;
  date: string;
  total: number;
  id: number;
  saleArticles: SaleArticleResponse[];
}

interface ProviderResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
}

interface OrderResponse {
  id: number;
  quantity: number;
  code: string;
  total: number;
  status: string;
  article?: ArticleResponse;
  provider?: ProviderResponse;
}

interface OrderStatusResponse {
  order: OrderResponse;
  status: string;
}

export interface RootObjectResponse {
  salePersist: SalePersistResponse;
  ordersCreated: OrderStatusResponse[];
}
