import {RequestStatus} from '../../shared/utils/request-status';
import {Action, createReducer, on} from '@ngrx/store';
import * as ProviderActions from './providers.actions';
import {Provider, ProviderArticle} from './providers.model';

export const ProviderFeatureKey = 'provider';

export interface State {
  providers: RequestStatus<Provider[]> | null;
  provider: RequestStatus<Provider> | null;
  providersArticle: RequestStatus<ProviderArticle[]> | null;
  error: any;
}

export const initialState: State = {
  providers: RequestStatus.initial() as RequestStatus<Provider[]>,
  provider: RequestStatus.initial() as RequestStatus<Provider>,
  providersArticle: RequestStatus.initial() as RequestStatus<ProviderArticle[]>,
  error: null,
};

const ProvidersReducer = createReducer(
  initialState,
  on(ProviderActions.loadProviders, (state) => ({...state, providers: RequestStatus.loading()})),
  on(ProviderActions.loadProvidersSuccess, (state, {data}) => ({...state, providers: RequestStatus.success(data)})),
  on(ProviderActions.loadProvidersFailure, (state, {error}) => ({...state, providers: RequestStatus.failed(error)})),
  on(ProviderActions.findProvider, (state) => ({...state, provider: RequestStatus.loading()})),
  on(ProviderActions.findProviderSuccess, (state, {provider}) => ({
    ...state,
    provider: RequestStatus.success(provider)
  })),
  on(ProviderActions.findProviderFailure, (state, {error}) => ({...state, provider: RequestStatus.failed(error)})),
  on(ProviderActions.updateProvider, (state) => ({...state, provider: RequestStatus.loading()})),
  on(ProviderActions.updateProviderSuccess, (state, {provider}) => ({
    ...state,
    provider: RequestStatus.success(provider)
  })),
  on(ProviderActions.updateProviderFailure, (state, {error}) => ({...state, provider: RequestStatus.failed(error)})),
  on(ProviderActions.createProvider, (state) => ({...state, provider: RequestStatus.loading()})),
  on(ProviderActions.createProviderSuccess, (state, {provider}) => ({
    ...state,
    provider: RequestStatus.success(provider)
  })),
  on(ProviderActions.createProviderFailure, (state, {error}) => ({...state, provider: RequestStatus.failed(error)})),
  on(ProviderActions.getArticleProvidersByProvider, (state) => ({...state, providersArticle: RequestStatus.loading()})),
  on(ProviderActions.getArticleProvidersByProviderSuccess, (state, {data}) => ({
    ...state,
    providersArticle: RequestStatus.success(data)
  })),
  on(ProviderActions.getArticleProvidersByProviderFailure, (state, {error}) => ({
    ...state,
    providersArticle: RequestStatus.failed(error)
  })),
);

export const reducer = (state: State | undefined, action: Action) => ProvidersReducer(state, action);
