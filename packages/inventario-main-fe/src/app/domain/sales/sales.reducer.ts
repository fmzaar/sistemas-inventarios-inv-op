import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as SalesActions from './sales.actions';
import {ArticleDropdown, Sale} from './sales.model';

export const SalesFeatureKey = 'sales';

export interface State {
  sales: RequestStatus<Sale[]> | null;
  articleDropdown: RequestStatus<ArticleDropdown[]> | null;
  error: any;
}

export const initialState: State = {
  sales: RequestStatus.initial() as RequestStatus<Sale[]>,
  articleDropdown: RequestStatus.initial() as RequestStatus<ArticleDropdown[]>,
  error: null,
};

const SalesReducer = createReducer(
  initialState,
  on(SalesActions.loadSales, (state) => ({...state, sales: RequestStatus.loading()})),
  on(SalesActions.loadSalesSuccess, (state, {data}) => ({...state, sales: RequestStatus.success(data)})),
  on(SalesActions.createSale, (state) => ({...state, sales: RequestStatus.loading()})),
  on(SalesActions.findArticleDropdown, (state) => ({...state, articleDropdown: RequestStatus.loading()})),
  on(SalesActions.findArticleDropdownSuccess, (state, {data}) => ({
    ...state,
    articleDropdown: RequestStatus.success(data)
  })),
);

export const reducer = (state: State | undefined, action: Action) => SalesReducer(state, action);
