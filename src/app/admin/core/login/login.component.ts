import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { NotieService } from '../../../shared/services/notification/notie.service';

import { ApiHelper } from '../../../shared/helpers/api-helper';
import { FormHelper } from '../../../shared/helpers/form-helper';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form;
  @ViewChild('submit') submit: ElementRef;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initiateForm();
  }

  onFormSubmit() {
    if (this.form.isValid()) {
      FormHelper.disableButton(this.submit, 'Logging in...');
      this.authService.loginAdmin(this.form.getData())
        .subscribe(
          (response) => {
            if (response.success) {
              this.onLogin();
            } else {
              NotieService.error('Error encountered while attempting to login');
            }
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              this.form.errors = errors;
            }
            FormHelper.enableButton(this.submit, 'Login');
          }
        );
    }
  }

  private onLogin() {
    this.authService.getAuthenticatedUser()
      .subscribe(
        (response) => {
          if (response.success) {
            this.authService.setLoggedInUser(response.data);
            this.router.navigate([this.authService.redirectUrl || this.authService.getDashboardUrl()]);
          } else {
            FormHelper.setFormErrors(this.form, {
              email: 'Error encountered while attempting to login'
            });
            FormHelper.enableButton(this.submit, 'Login');
          }
        },
        (err) => {
          ApiHelper.displayGenericErrorMessage(err);
          FormHelper.enableButton(this.submit, 'Login');
        }
      );
  }

  private initiateForm() {
    this.form = new ValidationManager({
      'email': 'required|email',
      'password': 'required',
      'remember': '',
    });
  }
}
