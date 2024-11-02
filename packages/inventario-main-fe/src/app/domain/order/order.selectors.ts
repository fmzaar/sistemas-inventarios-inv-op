import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromOrder from './order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.State>(fromOrder.OrderFeatureKey);

export const selectOrders = createSelector(selectOrderState, (state: fromOrder.State) => state.orders?.data);

export const selectArticleDropdown = createSelector(selectOrderState, (state: fromOrder.State) => state.articleDropdown?.data);

export const selectProviderDropdown = createSelector(selectOrderState, (state: fromOrder.State) => state.providerDropdown?.data);

