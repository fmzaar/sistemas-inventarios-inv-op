import {createAction, props} from '@ngrx/store';
import {Article, NewArticle} from './articles.model';
import {Inventory} from '../inventory/inventory.model';

export const loadArticles = createAction(`[Articles] Load articles`);

export const loadArticlesSuccess = createAction(`[Articles] Load articles success`, props<{ data: Article[] }>());

export const loadArticlesFailure = createAction(`[Articles] Load articles failed`, props<{ error: any }>());


export const findArticle = createAction(`[Articles] Find individual article`, props<{ id: number }>());
export const updateArticle = createAction(`[Articles] Update article`, props<{ article: Article }>());
export const createArticle = createAction(`[Articles] Create article`, props<{ article: NewArticle }>());
export const deleteArticle = createAction(`[Articles] Delete article`, props<{ id: number }>());

export const findArticleSuccess = createAction(`[Articles] Find individual success`, props<{ article: Article }>());
export const updateArticleSuccess = createAction(`[Articles] Update article success`, props<{ article: Article }>());
export const createArticleSuccess = createAction(`[Articles] Create article success`, props<{ article: Article }>());
export const deleteArticleSuccess = createAction(`[Articles] Delete article success`, props<{ id: number }>());

export const findArticleFailure = createAction(`[Articles] Find individual article failed`, props<{ error: any }>());
export const updateArticleFailure = createAction(`[Articles] Update article failed`, props<{ error: any }>());
export const createArticleFailure = createAction(`[Articles] Create article failed`, props<{ error: any }>());
export const deleteArticleFailure = createAction(`[Articles] Delete article failed`, props<{ error: any }>());

export const configInventory = createAction(`[Articles] Config inventory`, props<{ inventory: Inventory }>());
export const configInventorySuccess = createAction(`[Articles] Config inventory success`, props<{
  inventory: Inventory
}>());
export const configInventoryFailure = createAction(`[Articles] Config inventory failed`, props<{ error: any }>());
