import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUserSelectors from './user.selectors';
import * as UserActions from './user.actions';
import {RegistrationInterface, UserInterface} from '../../shared/interfaces/user.interface';

@Injectable()
export class UserControllerService {
  currentUser$ = this.store.pipe(select(fromUserSelectors.selectCurrentUser));

  constructor(private readonly store: Store<any>) {
  }

  loginUser(user: UserInterface) {
    this.store.dispatch(UserActions.login({user}));
  }

  registerUser(user: RegistrationInterface) {
    this.store.dispatch(UserActions.register({user}));
  }

  logout() {
    this.store.dispatch(UserActions.logout());
  }
}
