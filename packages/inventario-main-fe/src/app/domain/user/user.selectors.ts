import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(fromUser.UserFeatureKey);

export const selectCurrentUser = createSelector(selectUserState, (state: fromUser.State) => state.user?.data);
