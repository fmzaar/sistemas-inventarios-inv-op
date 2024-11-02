import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { UserApiService } from './user-api.service';
import { UserControllerService } from './user-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.UserFeatureKey, fromUser.reducer),
  ],
  providers: [UserApiService, UserControllerService],
})
export class UserModule {}
