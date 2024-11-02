import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProvider from './providers.reducer';

export const selectProviderState = createFeatureSelector<fromProvider.State>(fromProvider.ProviderFeatureKey);

export const selectProviders = createSelector(selectProviderState, (state: fromProvider.State) => state.providers?.data);

export const selectProvidersArticle = createSelector(selectProviderState, (state: fromProvider.State) => state.providersArticle?.data);
