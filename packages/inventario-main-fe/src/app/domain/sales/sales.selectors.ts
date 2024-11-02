import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSale from './sales.reducer';

export const selectSaleState = createFeatureSelector<fromSale.State>(fromSale.SalesFeatureKey);

export const selectSales = createSelector(selectSaleState, (state: fromSale.State) => state.sales?.data);

export const selectArticleDropdown = createSelector(selectSaleState, (state: fromSale.State) => state.articleDropdown?.data);
