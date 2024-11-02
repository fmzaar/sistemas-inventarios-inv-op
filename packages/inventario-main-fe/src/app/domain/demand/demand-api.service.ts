import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Demand} from './demand.model';

@Injectable()
export class DemandApiService {
  constructor(private readonly _http: HttpClient) {
  }

  getDemands(): Observable<Demand[]> {
    return this._http.get<Demand[]>(`${environment.apiBe}/articles`);
  }

  getDemand(id: number): Observable<Demand> {
    return this._http.get<Demand>(`${environment.apiBe}/articles/${id}`);
  }

  updateDemand(id: number, article: Demand): Observable<Demand> {
    return this._http.patch<Demand>(`${environment.apiBe}/articles/${id}`, article);
  }

  deleteDemand(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiBe}/articles/${id}`);
  }
}
