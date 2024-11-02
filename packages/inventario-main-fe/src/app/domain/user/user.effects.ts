import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiService} from './user-api.service';
import * as UserActions from './user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';
import {NavigationService} from '../../shared/services/navigation.service';

@Injectable()
export class UserEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({user}) =>
        this.userApiService.signIn(user).pipe(
          map(data => UserActions.loginSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(UserActions.loginFailure({error}));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      switchMap(({user}) => {
          this.sweetalertService.showLoading('Registrando usuario...');
          return this.userApiService.register(user).pipe(
            map(data => {
              this.sweetalertService.showSimpleAlert('Registro exitoso', 'Por favor, confirme su usuario desde su email', 'success', 'Aceptar')
                .then(() => this.navigationService.goToLogin());
              return UserActions.registerSuccess({data})
            }),
            catchError(({error}) => {
              this.sweetalertService.showSimpleErrorAlert(error);
              return of(UserActions.registerFailure({error}));
            })
          )
        }
      )));
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.userApiService.logout().pipe(
          map(() => {
            this.sweetalertService.showSimpleAlert('Sesión cerrada', 'Hasta pronto', 'success', 'Aceptar');
            return UserActions.logoutSuccess();
          }),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(UserActions.logoutFailure({error}));
          })
        )
      )
    ));

  constructor(private actions$: Actions,
              private userApiService: UserApiService,
              private sweetalertService: SweetalertService,
              private navigationService: NavigationService) {
  }
}
