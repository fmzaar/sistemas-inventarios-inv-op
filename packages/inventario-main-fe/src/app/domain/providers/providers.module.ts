import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {ProvidersEffects} from './providers.effects';
import {StoreModule} from '@ngrx/store';
import * as fromProvider from './providers.reducer';
import {ProvidersApiService} from './providers-api.service';
import {ProvidersControllerService} from './providers-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ProvidersEffects]),
    StoreModule.forFeature(fromProvider.ProviderFeatureKey, fromProvider.reducer),
  ],
  providers: [ProvidersApiService, ProvidersControllerService],
})
export class ProvidersModule {
}
