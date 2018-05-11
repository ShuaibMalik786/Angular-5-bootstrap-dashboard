import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthResolver implements Resolve<void> {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    if (!this.authService.isUserLoggedIn() || (route.data.roles && !this.authService.userHasRole(route.data.roles))) {
      const loginUrl = this.authService.getLoginUrl(route.data.roles[0]);
      // this.authService.logoutAndRedirect(this.router, loginUrl, state.url);
      this.authService.logoutAndRedirect(this.router, loginUrl);
    }
  }
}
