import {createAction, props} from '@ngrx/store';
import {ArticleDropdown, NewSale, Sale} from './sales.model';

export const loadSales = createAction(`[Sales] Load providers`);
export const loadSalesSuccess = createAction(`[Sales] Load providers success`, props<{ data: Sale[] }>());
export const loadSalesFailure = createAction(`[Sales] Load providers failed`, props<{ error: any }>());

export const createSale = createAction(`[Sales] Create sale`, props<{ data: NewSale }>());
export const createSaleSuccess = createAction(`[Sales] Create sale success`)
export const createSaleFailure = createAction(`[Sales] Create sale failed`, props<{ error: any }>());

export const findArticleDropdown = createAction(`[Sales] Find article dropdown`);
export const findArticleDropdownSuccess = createAction(`[Sales] Find article dropdown success`, props<{
  data: ArticleDropdown[]
}>());
export const findArticleDropdownFailure = createAction(`[Sales] Find article dropdown failed`, props<{ error: any }>());
