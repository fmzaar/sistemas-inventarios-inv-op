import {createAction, props} from '@ngrx/store';
import {Demand} from './demand.model';

export const loadDemand = createAction('[Demand] Load Demand');
export const loadDemandSuccess = createAction('[Demand] Load Demand Success', props<{ demands: Demand[] }>());
export const loadDemandFailure = createAction('[Demand] Load Demand Failure', props<{ error: any }>());

