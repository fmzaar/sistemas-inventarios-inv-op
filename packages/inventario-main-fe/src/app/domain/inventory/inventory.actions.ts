import {createAction, props} from '@ngrx/store';
import {Inventory} from './inventory.model';

export const showInventoryByCode = createAction(`[Articles] Show inventory by code`, props<{ code: string }>());
export const showInventoryByCodeSuccess = createAction(`[Articles] Show inventory by code success`, props<{
  data: Inventory
}>());
export const showInventoryByCodeFailure = createAction(`[Articles] Show inventory by code failed`, props<{
  error: any
}>());

export const showInventories = createAction(`[Articles] Show inventories`);

export const showInventoriesSuccess = createAction(`[Articles] Show inventories success`, props<{
  data: Inventory[]
}>());

export const showInventoriesFailure = createAction(`[Articles] Show inventories failed`, props<{
  error: any
}>());

export const saveInventory = createAction(`[Articles] Save inventory`, props<{ inventory: Inventory }>());

export const saveInventorySuccess = createAction(`[Articles] Save inventory success`, props<{
  inventory: Inventory
}>());

export const saveInventoryFailure = createAction(`[Articles] Save inventory failed`, props<{ error: any }>());
