import {Article} from '../articles/articles.model';

export interface Demand {
  id: number;
  article: Article;
  period: string;
  historicalDemand: number[];
}
