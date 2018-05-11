import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/operator/do';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      () => {
      },
      (err: HttpErrorResponse) => {

        // If it's unauthorized or forbidden error then logout and redirect to login page.
        if (err.status === 401 || err.status === 403) {
          const auth = this.injector.get(AuthService);
          auth.logout();
        }

        // Set the custom error message if the request is throttled.
        if (err.status === 429) {
          let errorMessage = 'You have reached the request limit.';

          if (err.headers.has('X-RateLimit-Reset')) {
            const resetTimestamp = +err.headers.get('X-RateLimit-Reset');
            const differenceString = moment.unix(resetTimestamp).fromNow(true);

            errorMessage += ` Please try again after ${differenceString}.`;
          } else {
            errorMessage += ` Please try again later.`;
          }

          Object.assign(err, err, {
            error: {
              message: errorMessage
            }
          });
        }

      });
  }
}
