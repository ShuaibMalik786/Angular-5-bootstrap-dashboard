import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { User } from '../../../shared/models/user-model';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard-base',
  template: ''
})
export class AdminDashboardBaseComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor(public authService: AuthService,
              protected route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
