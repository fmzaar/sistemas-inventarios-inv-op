import {createAction, props} from '@ngrx/store';
import {RegistrationInterface, UserInterface, UserResInterface} from '../../shared/interfaces/user.interface';

export const login = createAction(`[User] Login`, props<{ user: UserInterface }>());

export const loginSuccess = createAction(`[User] Login success`, props<{ data: UserResInterface }>());

export const loginFailure = createAction(`[User] Login failed`, props<{ error: any }>());

export const register = createAction(`[User] Register`, props<{ user: RegistrationInterface }>());

export const registerSuccess = createAction(`[User] Register success`, props<{ data: any }>());

export const registerFailure = createAction(`[User] Register failed`, props<{ error: any }>());

export const logout = createAction(`[User] Logout`);

export const logoutSuccess = createAction(`[User] Logout success`);

export const logoutFailure = createAction(`[User] Logout failed`, props<{ error: any }>());
