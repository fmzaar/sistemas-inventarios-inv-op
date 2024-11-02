import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Inventory} from './inventory.model';

@Injectable()
export class InventoryApiService {
  constructor(private readonly _http: HttpClient) {
  }

  getInventory(code: string): Observable<Inventory> {
    return this._http.get<any>(`${environment.apiBe}/inventory/${code}`);
  }

  getInventories(): Observable<Inventory[]> {
    return this._http.get<any>(`${environment.apiBe}/inventory`);
  }

  saveInventory(inventory: Inventory): Observable<Inventory> {
    return this._http.post<any>(`${environment.apiBe}/inventory`, inventory);
  }
}
