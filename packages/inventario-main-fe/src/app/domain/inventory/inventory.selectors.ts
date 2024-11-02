import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromInventory from './inventory.reducer';

export const selectInventoryState = createFeatureSelector<fromInventory.State>(fromInventory.InventoryFeatureKey);

export const selectInventory = createSelector(selectInventoryState, (state: fromInventory.State) => state.inventory?.data);

export const selectInventories = createSelector(selectInventoryState, (state: fromInventory.State) => state.inventories?.data);
