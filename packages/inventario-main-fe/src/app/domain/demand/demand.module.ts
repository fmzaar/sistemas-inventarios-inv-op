import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {DemandEffects} from './demand.effects';
import {StoreModule} from '@ngrx/store';
import * as fromDemands from './demand.reducer';
import {DemandApiService} from './demand-api.service';
import {DemandControllerService} from './demand-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([DemandEffects]),
    StoreModule.forFeature(fromDemands.DemandFeatureKey, fromDemands.reducer),
  ],
  providers: [DemandApiService, DemandControllerService],
})
export class DemandModule {
}
