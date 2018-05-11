import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../../services/auth/auth.service';
import { NotieService } from '../../../services/notification/notie.service';

import { ApiHelper } from '../../../helpers/api-helper';
import { FormHelper } from '../../../helpers/form-helper';

import { environment } from '../../../../../environments/environment';

declare let $: any;

@Component({
  selector: 'app-base-login',
  templateUrl: './base-login.component.html'
})
export class BaseLoginComponent implements OnInit {
  form;
  @Input('popup') popup: boolean = false;
  @Input('showRewardMessage') showRewardMessage: boolean = false;
  @Output('onSuccessfulLogin') onSuccessfulLogin = new EventEmitter<void>();
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
      this.authService.loginUser(this.form.getData())
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
              FormHelper.setFormErrors(this.form, errors);
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
          FormHelper.enableButton(this.submit, 'Login');
          if (response.success) {
            this.form.reset();
            this.authService.setLoggedInUser(response.data);
            if (!this.popup) {
              this.onSuccessfulLogin.emit();
              const redirectPath = this.authService.redirectUrl || '/';
              /*
               * If zinrelo is enabled then we do a full page refresh to allow
               * zinrelo to pick up the logged in user information.
               */
              if (environment.zinreloEnabled) {
                document.location.href = redirectPath;
              } else {
                this.router.navigate([redirectPath]);
              }
            } else {
              $('#login-modal').modal('hide');
              this.onSuccessfulLogin.emit();
            }
          } else {
            FormHelper.setFormErrors(this.form, {
              email: 'Error encountered while attempting to login'
            });
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
