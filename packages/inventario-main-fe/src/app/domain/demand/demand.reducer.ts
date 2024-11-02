import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as DemandActions from './demand.actions';
import {Demand} from './demand.model';

export const DemandFeatureKey = 'demand';

export interface State {
  demands: RequestStatus<Demand[]> | null;
  error: any;
}

export const initialState: State = {
  demands: RequestStatus.initial() as RequestStatus<Demand[]>,
  error: null,
};

const DemandReducer = createReducer(
  initialState,
  on(DemandActions.loadDemand, (state) => ({...state, demands: RequestStatus.loading()})),
  on(DemandActions.loadDemandSuccess, (state, {demands}) => ({...state, demands: RequestStatus.success(demands)})),
  on(DemandActions.loadDemandFailure, (state, {error}) => ({...state, demands: RequestStatus.failed(error)})),
);

export const reducer = (state: State | undefined, action: Action) => DemandReducer(state, action);
