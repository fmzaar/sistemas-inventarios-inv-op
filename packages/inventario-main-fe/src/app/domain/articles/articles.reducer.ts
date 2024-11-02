import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as ArticleActions from './articles.actions';
import {Article} from './articles.model';

export const ArticleFeatureKey = 'article';

export interface State {
  articles: RequestStatus<Article[]> | null;
  article: RequestStatus<Article> | null;
  error: any;
}

export const initialState: State = {
  articles: RequestStatus.initial() as RequestStatus<Article[]>,
  article: RequestStatus.initial() as RequestStatus<Article>,
  error: null,
};

const ArticlesReducer = createReducer(
  initialState,
  on(ArticleActions.loadArticles, (state) => ({...state, articles: RequestStatus.loading()})),
  on(ArticleActions.loadArticlesSuccess, (state, {data}) => ({...state, articles: RequestStatus.success(data)})),
  on(ArticleActions.loadArticlesFailure, (state, {error}) => ({...state, articles: RequestStatus.failed(error)})),
  on(ArticleActions.findArticle, (state) => ({...state, article: RequestStatus.loading()})),
  on(ArticleActions.findArticleSuccess, (state, {article}) => ({...state, article: RequestStatus.success(article)})),
  on(ArticleActions.findArticleFailure, (state, {error}) => ({...state, article: RequestStatus.failed(error)})),
  on(ArticleActions.updateArticle, (state) => ({...state, article: RequestStatus.loading()})),
  on(ArticleActions.updateArticleSuccess, (state, {article}) => ({...state, article: RequestStatus.success(article)})),
  on(ArticleActions.updateArticleFailure, (state, {error}) => ({...state, article: RequestStatus.failed(error)})),
  on(ArticleActions.createArticle, (state) => ({...state, article: RequestStatus.loading()})),
  on(ArticleActions.createArticleSuccess, (state, {article}) => ({...state, article: RequestStatus.success(article)})),
  on(ArticleActions.createArticleFailure, (state, {error}) => ({...state, article: RequestStatus.failed(error)})),
);

export const reducer = (state: State | undefined, action: Action) => ArticlesReducer(state, action);
