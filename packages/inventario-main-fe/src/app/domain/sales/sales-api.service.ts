import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ArticleDropdown, NewSale, RootObjectResponse, Sale} from './sales.model';

@Injectable()
export class SalesApiService {
  constructor(private readonly _http: HttpClient) {
  }

  getArticles(): Observable<ArticleDropdown[]> {
    return this._http.get<ArticleDropdown[]>(`${environment.apiBe}/articles`);
  }

  generateSale(sale: NewSale): Observable<RootObjectResponse> {
    return this._http.post<RootObjectResponse>(`${environment.apiBe}/sales`, sale);
  }

  getSales(): Observable<Sale[]> {
    return this._http.get<Sale[]>(`${environment.apiBe}/sales`);
  }
}
