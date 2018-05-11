import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ValidationManager } from 'ng2-validation-manager';
import swal from 'sweetalert2';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { AdminApiService } from '../../../shared/services/api/admin-api.service';

import { AdminDashboardBaseComponent } from '../base/admin-dashboard-base';

import { ApiHelper } from '../../../shared/helpers/api-helper';
import { FormHelper } from '../../../shared/helpers/form-helper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class AccountSettingsComponent extends AdminDashboardBaseComponent implements OnInit {

  constructor(public authService: AuthService,
              protected route: ActivatedRoute,
              private adminApiService: AdminApiService) {
    super(authService, route);
  }

  ngOnInit() {
  }

}
