import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { NotieService } from '../services/notification/notie.service';

export class ApiHelper {

  static displayGenericErrorMessage(err: HttpErrorResponse, message?: string) {
    NotieService.error(message ? message : (err.error.message || 'Unknown error occurred.'));
  }

  static displayNonValidationErrorMessage(err: HttpErrorResponse, message?: string) {
    // If the response is not a validation error or if it's a validation error with no
    // error messages, then display the default error message.
    if (err.status !== 422 || (err.status === 422 && err.error.errors.length === 0)) {
      NotieService.error(message ? message : (err.error.message || 'Unknown error occurred.'));
    }
  }

  static resolveValidationErrors(err: HttpErrorResponse, displayErrorMessage = false) {
    if (displayErrorMessage) {
      ApiHelper.displayNonValidationErrorMessage(err);
    }

    if (err.status === 422) {
      return err.error.errors;
    }
  }

  static find(observable: Observable<any>, defaultValue: object = {}) {
    return observable.map(response => {
      if (response.success) {
        return response.data;
      } else {
        return defaultValue;
      }
    }).catch((err) => {
      return Observable.of(err);
    });
  }

  static findOrFail(observable: Observable<any>, router: Router, redirectUrl?: string) {
    if (!redirectUrl) {
      redirectUrl = '/page-not-found';
    }

    return observable.map(response => {
      if (response.success) {
        return response.data;
      } else {
        router.navigate([redirectUrl]);
        return {};
      }
    }).catch((err) => {
      router.navigate([redirectUrl]);
      return Observable.of(err);
    });
  }
}
