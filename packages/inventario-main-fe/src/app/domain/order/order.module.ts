import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {OrderEffects} from './order.effects';
import {StoreModule} from '@ngrx/store';
import * as fromOrder from './order.reducer';
import {OrderApiService} from './order-api.service';
import {OrderControllerService} from './order-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([OrderEffects]),
    StoreModule.forFeature(fromOrder.OrderFeatureKey, fromOrder.reducer),
  ],
  providers: [OrderApiService, OrderControllerService],
})
export class OrderModule {
}
