import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {NavigationService} from "../services/navigation.service";

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  constructor(public authService: AuthService, private navigationService: NavigationService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isExpired) {
      this.navigationService.goToDashboard();
      return false;
    }
    return true;
  }
}
