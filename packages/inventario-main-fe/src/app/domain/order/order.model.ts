import {Provider} from '../providers/providers.model';
import {Article} from '../articles/articles.model';
import {EnumOrderStatus} from './order.enum';

export interface Order {
  id: number;
  code: string;
  quantity: number;
  article: Article;
  provider: Provider;
  subtotal: number;
  total: number;
  status: EnumOrderStatus;
}

export interface OrderCreation {
  articleId: number;
  providerId: number;
}


export interface ArticleDropdown {
  id: number;
  code: string;
  name: string;
}

export interface ProviderDropdown {
  id: number;
  name: string;
}

