import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from '../../models/user-model';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  dashboardUrl;
  user: User;
  subscription: Subscription;
  showAdminLogin = !environment.production;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    if (!this.authService.isUserLoggedIn()) {
      this.subscription = this.authService.userUpdated
        .subscribe((user: User) => this.updateUserInfo(user));
      return;
    }

    this.updateUserInfo(this.authService.getUser());

    this.authService.getAuthenticatedUser()
      .subscribe((response) => {
          if (response.success) {
            this.authService.setLoggedInUser(response.data);
            this.subscription = this.authService.userUpdated
              .subscribe((user: User) => this.updateUserInfo(user));
          } else {
            this.logout();
          }
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logoutAndFlushUser();
    this.isLoggedIn = false;
  }

  private updateUserInfo(user: User) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.dashboardUrl = this.authService.getDashboardUrl();
    this.user = user;
  }
}
