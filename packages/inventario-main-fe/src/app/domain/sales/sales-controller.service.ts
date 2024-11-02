import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUserSelectors from './sales.selectors';
import * as UserActions from './sales.actions';
import {NewSale} from './sales.model';

@Injectable()
export class SalesControllerService {
  sales$ = this.store.pipe(select(fromUserSelectors.selectSales));
  dropdown$ = this.store.pipe(select(fromUserSelectors.selectArticleDropdown));

  constructor(private readonly store: Store<any>) {
  }

  loadSales() {
    this.store.dispatch(UserActions.loadSales());
  }

  createSale(data: NewSale) {
    this.store.dispatch(UserActions.createSale({data}));
  }

  findArticleDropdown() {
    this.store.dispatch(UserActions.findArticleDropdown());
  }

}
