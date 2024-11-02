import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DemandApiService} from './demand-api.service';
import * as DemandsActions from './demand.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';

@Injectable()
export class DemandEffects {

  demand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DemandsActions.loadDemand),
      switchMap(() =>
        this.demandApiService.getDemands().pipe(
          map(data => DemandsActions.loadDemandSuccess({demands: data})),
          catchError(({error}) => {
            this.sweetalertService.showSimpleErrorAlert(error);
            return of(DemandsActions.loadDemandFailure({error}));
          })
        )
      )
    )
  );


  constructor(private actions$: Actions,
              private demandApiService: DemandApiService,
              private sweetalertService: SweetalertService) {
  }
}
