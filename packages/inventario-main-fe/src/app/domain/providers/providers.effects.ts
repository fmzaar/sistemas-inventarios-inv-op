import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProvidersApiService} from './providers-api.service';
import * as ProviderActions from './providers.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';
import {NavigationService} from '../../shared/services/navigation.service';

@Injectable()
export class ProvidersEffects {

  provider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.loadProviders),
      switchMap(() =>
        this.providerApiService.getProviders().pipe(
          map(data => ProviderActions.loadProvidersSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ProviderActions.loadProvidersFailure({error}));
          })
        )
      )
    )
  );

  findProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.findProvider),
      switchMap(({id}) =>
        this.providerApiService.getProvider(id).pipe(
          map(data => ProviderActions.findProviderSuccess({provider: data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ProviderActions.findProviderFailure({error}));
          })
        )
      )
    )
  );

  updateProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.updateProvider),
      switchMap(({provider}) =>
        this.providerApiService.updateProvider(provider.id, provider).pipe(
          map(data => ProviderActions.updateProviderSuccess({provider: data}) && ProviderActions.loadProviders()),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ProviderActions.updateProviderFailure({error}));
          })
        )
      )
    )
  );

  createProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.createProvider),
      switchMap(({provider}) => {
          return this.providerApiService.createProvider(provider).pipe(
            map(data => ProviderActions.createProviderSuccess({provider: data}) && ProviderActions.loadProviders()),
            catchError(({error}) => {
              this.sweetalertService.showSimpleErrorAlert(error);
              return of(ProviderActions.createProviderFailure({error}));
            })
          );
        }
      )
    )
  );

  deleteProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.deleteProvider),
      switchMap(({id}) =>
        this.providerApiService.deleteProvider(id).pipe(
          map(() => ProviderActions.deleteProviderSuccess({id}) && ProviderActions.loadProviders()),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ProviderActions.deleteProviderFailure({error}));
          })
        )
      )
    )
  );

  getArticleProvidersByProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.getArticleProvidersByProvider),
      switchMap(({id}) =>
        this.providerApiService.getArticleProvidersByProvider(id).pipe(
          map(data => ProviderActions.getArticleProvidersByProviderSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ProviderActions.getArticleProvidersByProviderFailure({error}));
          })
        )
      )
    )
  );

  createOrUpdateArticleProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProviderActions.createOrUpdateArticleProvider),
      switchMap(({articleProviders}) =>
        this.providerApiService.createOrUpdateArticleProvider(articleProviders).pipe(
          map(data => ProviderActions.createOrUpdateArticleProviderSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(ProviderActions.createOrUpdateArticleProviderFailure({error}));
          })
        )
      )
    )
  );


  constructor(private actions$: Actions,
              private providerApiService: ProvidersApiService,
              private sweetalertService: SweetalertService,
              private navigationService: NavigationService) {
  }
}
