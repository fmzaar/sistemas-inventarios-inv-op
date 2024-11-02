import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {ArticlesEffects} from './articles.effects';
import {StoreModule} from '@ngrx/store';
import * as fromUser from './articles.reducer';
import {ArticlesApiService} from './articles-api.service';
import {ArticlesControllerService} from './articles-controller.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ArticlesEffects]),
    StoreModule.forFeature(fromUser.ArticleFeatureKey, fromUser.reducer),
  ],
  providers: [ArticlesApiService, ArticlesControllerService],
})
export class ArticlesModule {
}
