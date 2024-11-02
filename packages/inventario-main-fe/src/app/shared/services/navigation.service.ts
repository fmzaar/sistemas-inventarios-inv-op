import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(readonly router: Router, readonly http: HttpClient) {
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToDashboard() {
    this.router.navigate(['pages/dashboard']);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
