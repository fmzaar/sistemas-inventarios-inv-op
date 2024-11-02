import {Article} from '../articles/articles.model';

export interface Provider {
  id: number;
  name: string;
  address: string;
  phone: string;
  articles: any[];
}

export interface NewProvider {
  name: string;
  address: string;
  phone: string;
  articles: Article[];
}

export interface ProviderArticle {
  providerId: number;
  articleId: number;
  purchasePrice: number;
  priority: number;
  daysDelay: number;
}
