import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrderApiService} from './order-api.service';
import * as OrderActions from './order.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SweetalertService} from '../../shared/services/sweetalert.service';
import {NavigationService} from '../../shared/services/navigation.service';

@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.loadOrders),
    switchMap(() => this.orderApiService.getOrders().pipe(
      map(orders => OrderActions.loadOrdersSuccess({data: orders})),
      catchError(error => of(OrderActions.loadOrdersFailure({error})))
    ))
  ));

  createOrder$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.createOrder),
    switchMap(({order}) => this.orderApiService.generateOrder(order).pipe(
      map(order => OrderActions.createOrderSuccess({order})),
      catchError(error => of(OrderActions.createOrderFailure({error})))
    ))
  ));

  changeOrderStatus$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.changeOrderStatus),
    switchMap(({orderId, status}) => this.orderApiService.changeOrderStatus(orderId, status).pipe(
      map(order => OrderActions.changeOrderStatusSuccess({order})),
      catchError(error => of(OrderActions.changeOrderStatusFailure({error})))
    ))
  ));

  findArticleDropdown$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.findArticleDropdown),
    switchMap(() => this.orderApiService.getArticleDropdown().pipe(
      map(data => OrderActions.findArticleDropdownSuccess({data})),
      catchError(error => of(OrderActions.findArticleDropdownFailure({error})))
    ))
  ));

  findProviderByArticle$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.findProviderByArticle),
    switchMap(({articleId}) => this.orderApiService.getProviderDropdown(articleId).pipe(
      map(data => OrderActions.findProviderByArticleSuccess({data})),
      catchError(error => of(OrderActions.findProviderByArticleFailure({error})))
    ))
  ));


  constructor(private actions$: Actions,
              private orderApiService: OrderApiService,
              private sweetalertService: SweetalertService,
              private navigationService: NavigationService) {
  }
}
