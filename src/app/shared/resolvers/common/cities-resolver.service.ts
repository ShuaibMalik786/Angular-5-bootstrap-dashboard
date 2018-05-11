import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { CommonApiService } from '../../services/api/common-api.service';
import { ApiHelper } from '../../helpers/api-helper';

@Injectable()
export class CitiesResolver implements Resolve<object> {
  constructor(private router: Router,
              private commonApiService: CommonApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return ApiHelper.findOrFail(
      this.commonApiService.getCities(),
      this.router,
      '/'
    );
  }
}
