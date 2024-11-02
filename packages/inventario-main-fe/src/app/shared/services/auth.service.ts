import {Injectable} from '@angular/core';
import {JwtTokenInterface} from '../interfaces/user.interface';
import jwt_decode from 'jwt-decode';
import {NavigationService} from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public readonly navigationService: NavigationService) {
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decodedToken = jwt_decode<JwtTokenInterface>(token);
    return (decodedToken.exp < Date.now() / 1000);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.navigationService.goToLogin();
  }

  setToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
    this.navigationService.goToDashboard();
  }
}
