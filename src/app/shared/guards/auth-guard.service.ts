import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkUserAuthentication(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkUserAuthentication(state.url);
  }

  private checkUserAuthentication(url: string) {
    return this.authService.getAuthenticatedUser()
      .map(response => {
        if (response.success) {
          this.authService.setLoggedInUser(response.data);
          return true;
        }

        this.handleUnauthenticatedUser(url);
        return false;
      }).catch(() => {
        this.handleUnauthenticatedUser(url);
        return Observable.of(false);
      });
  }

  private handleUnauthenticatedUser(redirectUrl: string) {
    // Clear the logged in user info and redirect the user to the appropriate login page.
    const loginUrl = this.authService.getLoginUrlFromRouteUrl(redirectUrl);
    this.authService.logoutAndRedirect(this.router, loginUrl, redirectUrl);
  }
}
