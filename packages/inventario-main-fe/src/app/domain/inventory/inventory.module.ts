import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {InventoryEffects} from './inventory.effects';
import {StoreModule} from '@ngrx/store';
import * as fromInventory from './inventory.reducer';
import {InventoryApiService} from './inventory-api.service';
import {InventoryControllerService} from './inventory-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([InventoryEffects]),
    StoreModule.forFeature(fromInventory.InventoryFeatureKey, fromInventory.reducer),
  ],
  providers: [InventoryApiService, InventoryControllerService],
})
export class InventoryModule {
}
