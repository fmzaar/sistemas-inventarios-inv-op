import {createAction, props} from '@ngrx/store';
import {ArticleDropdown, Order, OrderCreation, ProviderDropdown} from './order.model';

export const loadOrders = createAction(`[Orders] Load orders`);
export const findArticleDropdown = createAction(`[Orders] Find article dropdown`);
export const findProviderByArticle = createAction(`[Orders] Find provider by article`, props<{ articleId: number }>());
export const changeOrderStatus = createAction(`[Orders] Change order status`, props<{
  orderId: number,
  status: string
}>());
export const createOrder = createAction(`[Orders] Create order`, props<{ order: OrderCreation }>());


export const findOrderSuccess = createAction(`[Orders] Find individual order success`, props<{ order: Order }>());
export const updateOrderSuccess = createAction(`[Orders] Update order success`, props<{ order: Order }>());
export const createOrderSuccess = createAction(`[Orders] Create order success`, props<{ order: Order }>());
export const loadOrdersSuccess = createAction(`[Orders] Load orders success`, props<{ data: Order[] }>());
export const findArticleDropdownSuccess = createAction(`[Orders] Find article dropdown success`, props<{
  data: ArticleDropdown[]
}>());
export const findProviderByArticleSuccess = createAction(`[Orders] Find provider by article success`, props<{
  data: ProviderDropdown[]
}>());
export const changeOrderStatusSuccess = createAction(`[Orders] Change order status success`, props<{ order: Order }>());

export const findOrderFailure = createAction(`[Orders] Find individual order failed`, props<{ error: any }>());
export const updateOrderFailure = createAction(`[Orders] Update order failed`, props<{ error: any }>());
export const createOrderFailure = createAction(`[Orders] Create order failed`, props<{ error: any }>());
export const loadOrdersFailure = createAction(`[Orders] Load orders failed`, props<{ error: any }>());
export const findArticleDropdownFailure = createAction(`[Orders] Find article dropdown failed`, props<{
  error: any
}>());
export const findProviderByArticleFailure = createAction(`[Orders] Find provider by article failed`, props<{
  error: any
}>());
export const changeOrderStatusFailure = createAction(`[Orders] Change order status failed`, props<{ error: any }>());

