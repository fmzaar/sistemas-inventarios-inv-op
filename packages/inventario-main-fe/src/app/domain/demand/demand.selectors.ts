import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromDemands from './demand.reducer';

export const selectDemandState = createFeatureSelector<fromDemands.State>(fromDemands.DemandFeatureKey);

export const selectDemands = createSelector(selectDemandState, (state: fromDemands.State) => state.demands?.data);
