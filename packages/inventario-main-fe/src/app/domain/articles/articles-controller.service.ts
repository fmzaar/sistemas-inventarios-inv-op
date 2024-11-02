import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUserSelectors from './articles.selectors';
import * as UserActions from './articles.actions';
import {Article} from './articles.model';
import {Inventory} from '../inventory/inventory.model';

@Injectable()
export class ArticlesControllerService {
  articles$ = this.store.pipe(select(fromUserSelectors.selectArticles));

  constructor(private readonly store: Store<any>) {
  }

  loadArticles() {
    this.store.dispatch(UserActions.loadArticles());
  }

  updateArticle(article: Article) {
    this.store.dispatch(UserActions.updateArticle({article}));
  }

  createArticle(article: Article) {
    this.store.dispatch(UserActions.createArticle({article}));
  }

  deleteArticle(id: number) {
    this.store.dispatch(UserActions.deleteArticle({id}));
  }

  saveInventory(inventory: Inventory) {
    this.store.dispatch(UserActions.configInventory({inventory}));
  }
}
