import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Order, OrderCreation, ProviderDropdown} from './order.model';

@Injectable()
export class OrderApiService {
  constructor(private readonly _http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(`${environment.apiBe}/purchase-orders`);
  }

  generateOrder(order: OrderCreation): Observable<Order> {
    console.log('order', order);
    return this._http.post<Order>(`${environment.apiBe}/purchase-orders`, order);
  }

  changeOrderStatus(orderId: number, status: string): Observable<Order> {
    return this._http.put<Order>(`${environment.apiBe}/purchase-orders/${orderId}/status`, {status});
  }

  getArticleDropdown(): Observable<any> {
    return this._http.get<any>(`${environment.apiBe}/purchase-orders/article-dropdown`);
  }

  getProviderDropdown(articleId: number): Observable<ProviderDropdown[]> {
    return this._http.get<any>(`${environment.apiBe}/purchase-orders/article/${articleId}/providers`);
  }

}
