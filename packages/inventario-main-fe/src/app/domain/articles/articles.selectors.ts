import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromArticle from './articles.reducer';

export const selectArticleState = createFeatureSelector<fromArticle.State>(fromArticle.ArticleFeatureKey);

export const selectArticles = createSelector(selectArticleState, (state: fromArticle.State) => state.articles?.data);
