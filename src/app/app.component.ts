import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { DefaultConstant } from './shared/constants/default-constant';
import { environment } from '../environments/environment';

declare let $: any;
declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  defaultTitle = DefaultConstant.TITLE;
  defaultDescription = DefaultConstant.DESCRIPTION;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit() {
    this.setupCustomPageAttributes();
    this.setupGoogleAnalytics();
  }

  ngAfterViewInit() {
    /**
     * Snippet to enable enter button action trigger click on buttons.
     * This is useful for search buttons and many more.
     */
    const selector = '.input-group:has(input:input, span.input-group-btn:has(button)) input:input';

    $(document).on('keypress', selector, function (e) {
      if (e.which === 13) {
        $(this).closest('.input-group').find('button').click();
      }
    });
  }

  private setupCustomPageAttributes() {
    let parentTitle: string;

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .map((route) => {
        parentTitle = undefined;

        while (route.firstChild) {
          if (route.parent && route.parent.snapshot.data['title']) {
            parentTitle = route.parent.snapshot.data['title'];
          }
          route = route.firstChild;
        }

        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((data) => {
        // Page title takes the following precedence.
        // Route title -> Route Parent Title -> Default title
        this.titleService.setTitle(data['title'] || parentTitle || this.defaultTitle);
      });
  }

  private setupGoogleAnalytics() {
    if (!environment.googleAnalyticsEnabled) {
      return;
    }

    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', environment.googleAnalyticsTrackingId, {
            'page_path': event.urlAfterRedirects
          });
        }
      });
  }
}
