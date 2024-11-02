import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {NewProvider, Provider, ProviderArticle} from './providers.model';

@Injectable()
export class ProvidersApiService {
  constructor(private readonly _http: HttpClient) {
  }

  getProviders(): Observable<Provider[]> {
    return this._http.get<Provider[]>(`${environment.apiBe}/providers`);
  }

  getProvider(id: number): Observable<Provider> {
    return this._http.get<Provider>(`${environment.apiBe}/providers/${id}`);
  }

  createProvider(article: NewProvider): Observable<Provider> {
    return this._http.post<Provider>(`${environment.apiBe}/providers`, article);
  }

  updateProvider(id: number, article: Provider): Observable<Provider> {
    return this._http.put<Provider>(`${environment.apiBe}/providers/${id}`, article);
  }

  deleteProvider(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiBe}/providers/${id}`);
  }

  checkCode(code: string): Observable<boolean> {
    return this._http.get<boolean>(`${environment.apiBe}/providers/check-code`, {params: {code}});
  }

  getArticleProvidersByProvider(id: number): Observable<ProviderArticle[]> {
    return this._http.get<ProviderArticle[]>(`${environment.apiBe}/providers/${id}/articles`);
  }

  createOrUpdateArticleProvider(articleProviders: ProviderArticle[]): Observable<ProviderArticle[]> {
    return this._http.post<ProviderArticle[]>(`${environment.apiBe}/providers/articles`, articleProviders);
  }
}
