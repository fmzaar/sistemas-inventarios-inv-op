import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromDemandSelectors from './demand.selectors';
import * as DemandActions from './demand.actions';

@Injectable()
export class DemandControllerService {
  demands$ = this.store.pipe(select(fromDemandSelectors.selectDemands));

  constructor(private readonly store: Store<any>) {
  }

  loadDemands() {
    this.store.dispatch(DemandActions.loadDemand());
  }

  /*
    updateDemand(demand:Demand) {
      this.store.dispatch(DemandActions.updateDemand({demand}));
    }

    createDemand(demand: Demand) {
      this.store.dispatch(DemandActions.createDemand({demand}));
    }

    deleteDemand(id: number) {
      this.store.dispatch(DemandActions.deleteDemand({id}));
    }

   */
}
