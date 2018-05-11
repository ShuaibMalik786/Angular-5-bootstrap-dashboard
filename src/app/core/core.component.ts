import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { ScrollHelper } from '../shared/helpers/scroll-helper';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit, OnDestroy, AfterViewInit {
  routerSubscription: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        ScrollHelper.scrollToTop();
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    ScrollHelper.scrollToTop();
  }
}
