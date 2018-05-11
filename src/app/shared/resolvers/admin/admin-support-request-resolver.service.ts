import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AdminApiService } from '../../services/api/admin-api.service';
import { ApiHelper } from '../../helpers/api-helper';

@Injectable()
export class AdminSupportRequestResolver {
  constructor(private router: Router,
              private adminApiService: AdminApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  }
}
