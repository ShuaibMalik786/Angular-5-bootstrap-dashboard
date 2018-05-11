import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../shared/services/auth/auth.service';
import { User } from '../../shared/models/user-model';

import { ScrollHelper } from '../../shared/helpers/scroll-helper';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User;
  userSubscription: Subscription;
  routerSubscription: Subscription;
  currentYear;

  constructor(private authService: AuthService,
              private renderer: Renderer2,
              private router: Router) {
  }

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();

    this.user = this.authService.getUser();

    this.userSubscription = this.authService.userUpdated
      .subscribe((user: User) => this.user = user);

    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => ScrollHelper.scrollToTop());

    this.addDashboardClasses();
  }

  ngOnDestroy(): void {
    this.removeDashboardClasses();
    this.userSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // Temporary work around for component navigation height fix.
    $(window).resize();
    ScrollHelper.scrollToTop();
  }

  private addDashboardClasses() {
    this.renderer.addClass(document.body, 'hold-transition');
    this.renderer.addClass(document.body, 'skin-black');
    this.renderer.addClass(document.body, 'sidebar-mini');
  }

  private removeDashboardClasses() {
    this.renderer.removeClass(document.body, 'sidebar-mini');
    this.renderer.removeClass(document.body, 'skin-black');
    this.renderer.removeClass(document.body, 'hold-transition');
  }
}
