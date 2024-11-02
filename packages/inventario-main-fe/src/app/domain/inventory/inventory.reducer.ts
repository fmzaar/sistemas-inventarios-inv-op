import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as ArticleActions from './inventory.actions';
import {Inventory} from './inventory.model';

export const InventoryFeatureKey = 'inventory';

export interface State {
  inventory: RequestStatus<Inventory> | null;
  inventories: RequestStatus<Inventory[]> | null;
  error: any;
}

export const initialState: State = {
  inventory: RequestStatus.initial() as RequestStatus<Inventory>,
  inventories: RequestStatus.initial() as RequestStatus<Inventory[]>,
  error: null,
};

const InventoryReducer = createReducer(
  initialState,
  on(ArticleActions.showInventoryByCode, (state) => ({...state, inventory: RequestStatus.loading()})),
  on(ArticleActions.showInventoryByCodeSuccess, (state, {data}) => ({
    ...state,
    inventory: RequestStatus.success(data)
  })),
  on(ArticleActions.showInventoryByCodeFailure, (state, {error}) => ({
    ...state,
    inventory: RequestStatus.failed(error)
  })),
);

export const reducer = (state: State | undefined, action: Action) => InventoryReducer(state, action);
