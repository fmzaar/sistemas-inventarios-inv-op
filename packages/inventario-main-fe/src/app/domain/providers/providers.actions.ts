import {createAction, props} from '@ngrx/store';
import {Provider, ProviderArticle} from './providers.model';

export const loadProviders = createAction(`[Providers] Load providers`);
export const loadProvidersSuccess = createAction(`[Providers] Load providers success`, props<{ data: Provider[] }>());
export const loadProvidersFailure = createAction(`[Providers] Load providers failed`, props<{ error: any }>());


export const findProvider = createAction(`[Providers] Find individual provider`, props<{ id: number }>());
export const updateProvider = createAction(`[Providers] Update provider`, props<{ provider: Provider }>());
export const createProvider = createAction(`[Providers] Create provider`, props<{ provider: Provider }>());
export const deleteProvider = createAction(`[Providers] Delete provider`, props<{ id: number }>());

export const findProviderSuccess = createAction(`[Providers] Find individual success`, props<{ provider: Provider }>());
export const updateProviderSuccess = createAction(`[Providers] Update provider success`, props<{
  provider: Provider
}>());
export const createProviderSuccess = createAction(`[Providers] Create provider success`, props<{
  provider: Provider
}>());
export const deleteProviderSuccess = createAction(`[Providers] Delete provider success`, props<{ id: number }>());

export const findProviderFailure = createAction(`[Providers] Find individual provider failed`, props<{ error: any }>());
export const updateProviderFailure = createAction(`[Providers] Update provider failed`, props<{ error: any }>());
export const createProviderFailure = createAction(`[Providers] Create provider failed`, props<{ error: any }>());
export const deleteProviderFailure = createAction(`[Providers] Delete provider failed`, props<{ error: any }>());

export const getArticleProvidersByProvider = createAction(`[Providers] Get article providers by provider`, props<{
  id: number
}>());
export const getArticleProvidersByProviderSuccess = createAction(`[Providers] Get article providers by provider success`, props<{
  data: ProviderArticle[]
}>());
export const getArticleProvidersByProviderFailure = createAction(`[Providers] Get article providers by provider failed`, props<{
  error: any
}>());

export const createOrUpdateArticleProvider = createAction(`[Providers] Create or update article provider`, props<{
  articleProviders: ProviderArticle[]
}>());
export const createOrUpdateArticleProviderSuccess = createAction(`[Providers] Create or update article provider success`, props<{
  data: ProviderArticle[]
}>());
export const createOrUpdateArticleProviderFailure = createAction(`[Providers] Create or update article provider failed`, props<{
  error: any
}>());
