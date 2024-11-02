import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {SalesEffects} from './sales.effects';
import {StoreModule} from '@ngrx/store';
import * as fromSales from './sales.reducer';
import {SalesApiService} from './sales-api.service';
import {SalesControllerService} from './sales-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([SalesEffects]),
    StoreModule.forFeature(fromSales.SalesFeatureKey, fromSales.reducer),
  ],
  providers: [SalesApiService, SalesControllerService],
})
export class SalesModule {
}
