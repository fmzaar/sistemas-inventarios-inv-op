import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromUserSelectors from './order.selectors';
import * as UserActions from './order.actions';
import {OrderCreation,} from './order.model';

@Injectable()
export class OrderControllerService {
  orders$ = this.store.pipe(select(fromUserSelectors.selectOrders));
  articleDropdown$ = this.store.pipe(select(fromUserSelectors.selectArticleDropdown));
  providerDropdown$ = this.store.pipe(select(fromUserSelectors.selectProviderDropdown));

  constructor(private readonly store: Store<any>) {
  }

  loadOrders() {
    this.store.dispatch(UserActions.loadOrders());
  }

  createOrder(order: OrderCreation) {
    this.store.dispatch(UserActions.createOrder({order}));
  }

  changeOrderStatus(orderId: number, status: string) {
    this.store.dispatch(UserActions.changeOrderStatus({orderId, status}));
  }

  findArticleDropdown() {
    this.store.dispatch(UserActions.findArticleDropdown());
  }

  findProviderByArticle(articleId: number) {
    this.store.dispatch(UserActions.findProviderByArticle({articleId}));
  }


}
