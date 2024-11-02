import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {RegistrationInterface, UserInterface, UserResInterface} from '../../shared/interfaces/user.interface';

@Injectable()
export class UserApiService {
  constructor(private readonly _http: HttpClient, private readonly authService: AuthService) {
  }

  signIn(user: UserInterface): Observable<UserResInterface> {
    return this._http.post<UserResInterface>(`${environment.apiBe}/auth/login`, user).pipe(
      tap(res => this.authService.setToken(res.access_token)),
    );
  }

  register(user: RegistrationInterface) {
    return this._http.post(`${environment.apiBe}/auth/register`, user)
  }

  logout() {
    this.authService.logout();
    return new Observable();
  }
}
