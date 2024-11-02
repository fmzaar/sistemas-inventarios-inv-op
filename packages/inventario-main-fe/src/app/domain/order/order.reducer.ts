import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as OrderActions from './order.actions';
import {ArticleDropdown, Order, ProviderDropdown} from './order.model';

export const OrderFeatureKey = 'order';

export interface State {
  orders: RequestStatus<Order[]>;
  articleDropdown: RequestStatus<ArticleDropdown[]>;
  providerDropdown: RequestStatus<ProviderDropdown[]>;
  error: any;
}

export const initialState: State = {
  orders: RequestStatus.initial(),
  articleDropdown: RequestStatus.initial(),
  providerDropdown: RequestStatus.initial(),
  error: null,
};

const OrderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, state => ({...state, orders: RequestStatus.loading()})),
  on(OrderActions.findArticleDropdown, state => ({...state, articleDropdown: RequestStatus.loading()})),
  on(OrderActions.findProviderByArticle, state => ({...state, providerDropdown: RequestStatus.loading()})),
  on(OrderActions.loadOrdersSuccess, (state, {data}) => ({...state, orders: RequestStatus.success(data)})),
  on(OrderActions.findArticleDropdownSuccess, (state, {data}) => ({
    ...state,
    articleDropdown: RequestStatus.success(data)
  })),
  on(OrderActions.findProviderByArticleSuccess, (state, {data}) => ({
    ...state,
    providerDropdown: RequestStatus.success(data)
  })),
  on(OrderActions.createOrder, state => ({...state, orders: RequestStatus.loading()})),
);

export const reducer = (state: State | undefined, action: Action) => OrderReducer(state, action);
