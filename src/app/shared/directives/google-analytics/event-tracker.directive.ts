import { Directive, HostListener, Input } from '@angular/core';

import * as _ from 'lodash';

import { environment } from '../../../../environments/environment';

declare let gtag: any;

@Directive({
  selector: '[eventTracker]'
})
export class EventTrackerDirective {
  @Input('eventTracker') options: any;

  @HostListener('click') onClick() {
    if (!environment.googleAnalyticsEnabled || !this.options) {
      return;
    }

    if (typeof this.options === 'string') {
      gtag('event', this.options);
    }

    if (typeof this.options === 'object') {
      if (this.options.hasOwnProperty('event_name')) {
        gtag('event', this.options.event_name, _.omit(this.options, 'event_name'));
      } else if (this.options.hasOwnProperty('event_action')) {
        gtag('event', this.options.event_action, this.options);
      }
    }
  }
}
