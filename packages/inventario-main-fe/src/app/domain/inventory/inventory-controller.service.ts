import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromInventorySelectors from './inventory.selectors';
import * as InventoryActions from './inventory.actions';
import {Inventory} from './inventory.model';

@Injectable()
export class InventoryControllerService {
  inventory$ = this.store.pipe(select(fromInventorySelectors.selectInventory));
  inventories$ = this.store.pipe(select(fromInventorySelectors.selectInventories));

  constructor(private readonly store: Store<any>) {
  }

  showInventoryByCode(code: string): void {
    this.store.dispatch(InventoryActions.showInventoryByCode({code}));
  }

  showInventories(): void {
    this.store.dispatch(InventoryActions.showInventories());
  }

  saveInventory(inventory: Inventory) {
    this.store.dispatch(InventoryActions.saveInventory({inventory}));
  }
}
