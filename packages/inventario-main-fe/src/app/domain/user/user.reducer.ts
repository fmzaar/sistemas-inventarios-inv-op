import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as UserActions from './user.actions';

export const UserFeatureKey = 'user';

export interface State {
  user: RequestStatus<any> | null;
}

export const initialState: State = {
  user: RequestStatus.initial() as RequestStatus<any>,
};

const UserReducer = createReducer(
  initialState,
  on(UserActions.login, state => ({
    ...state,
    user: RequestStatus.loading(),
  })),
  on(UserActions.loginFailure, (state, action) => ({
    ...state,
    user: RequestStatus.failed(action.error),
  })),
  on(UserActions.loginSuccess, state => ({
    ...state,
    user: RequestStatus.success({}),
  })),
  on(UserActions.register, state => ({
    ...state,
    user: RequestStatus.loading(),
  })),
  on(UserActions.registerFailure, (state, action) => ({
    ...state,
    user: RequestStatus.failed(action.error),
  })),
  on(UserActions.logoutSuccess, state => ({
    ...state,
    user: RequestStatus.success({}),
  })),
  on(UserActions.logoutFailure, (state, action) => ({
    ...state,
    user: RequestStatus.failed(action.error),
  })),
);

export const reducer = (state: State | undefined, action: Action) => UserReducer(state, action);
