import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {InventoryApiService} from './inventory-api.service';
import * as InventoryActions from './inventory.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';
import {NavigationService} from '../../shared/services/navigation.service';

@Injectable()
export class InventoryEffects {


  showInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryActions.showInventoryByCode),
      switchMap(({code}) =>
        this.articlesApiService.getInventory(code).pipe(
          map(data => InventoryActions.showInventoryByCodeSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(InventoryActions.showInventoryByCodeFailure({error}));
          })
        )
      )
    )
  );

  showInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryActions.showInventories),
      switchMap(() =>
        this.articlesApiService.getInventories().pipe(
          map(data => InventoryActions.showInventoriesSuccess({data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(InventoryActions.showInventoriesFailure({error}));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private articlesApiService: InventoryApiService,
              private sweetalertService: SweetalertService,
              private navigationService: NavigationService) {
  }
}
