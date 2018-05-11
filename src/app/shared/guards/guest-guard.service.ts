import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class GuestGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkGuestUser();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkGuestUser();
  }

  private checkGuestUser() {
    if (!this.authService.isUserLoggedIn()) {
      return true;
    }

    this.authService.redirectToDashboard(this.router);
    return false;
  }
}
