import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Article, NewArticle} from './articles.model';
import {Inventory} from '../inventory/inventory.model';

@Injectable()
export class ArticlesApiService {
  constructor(private readonly _http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this._http.get<Article[]>(`${environment.apiBe}/articles`);
  }

  getArticle(id: number): Observable<Article> {
    return this._http.get<Article>(`${environment.apiBe}/articles/${id}`);
  }

  createArticle(article: NewArticle): Observable<Article> {
    return this._http.post<Article>(`${environment.apiBe}/articles`, article);
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this._http.put<Article>(`${environment.apiBe}/articles/${id}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiBe}/articles/${id}`);
  }

  checkCode(code: string): Observable<boolean> {
    return this._http.get<boolean>(`${environment.apiBe}/articles/check-code`, {params: {code}});
  }

  saveInventory(inventory: Inventory) {
    return this._http.post(`${environment.apiBe}/articles/config-inventory`, inventory);
  }
}
