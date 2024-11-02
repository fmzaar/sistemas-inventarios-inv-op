import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUserSelectors from './providers.selectors';
import * as UserActions from './providers.actions';
import {Provider, ProviderArticle} from './providers.model';

@Injectable()
export class ProvidersControllerService {
  providers$ = this.store.pipe(select(fromUserSelectors.selectProviders));
  providerArticle$ = this.store.pipe(select(fromUserSelectors.selectProvidersArticle));

  constructor(private readonly store: Store<any>) {
  }

  loadProviders() {
    this.store.dispatch(UserActions.loadProviders());
  }

  updateProvider(provider: Provider) {
    this.store.dispatch(UserActions.updateProvider({provider}));
  }

  createProvider(provider: Provider) {
    this.store.dispatch(UserActions.createProvider({provider}));
  }

  deleteProvider(id: number) {
    this.store.dispatch(UserActions.deleteProvider({id}));
  }

  createOrUpdateArticleProvider(articleProviders: ProviderArticle[]) {
    this.store.dispatch(UserActions.createOrUpdateArticleProvider({articleProviders}));
  }

  getArticleProviders(id: number) {
    this.store.dispatch(UserActions.getArticleProvidersByProvider({id}));
  }
}
