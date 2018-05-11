import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../shared/services/auth/auth.service';

import { FormHelper } from '../../shared/helpers/form-helper';
import { ApiHelper } from '../../shared/helpers/api-helper';
import { RoleConstant } from '../../shared/constants/role-constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  form;
  token: string;
  email: string;
  passwordUpdated = false;
  tokenCheckCompleted = false;
  validToken = false;
  loginUrl = RoleConstant.USER_LOGIN_URL;
  @ViewChild('submit') submit: ElementRef;
  errorMessage = 'Invalid request. Please check the link again!';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');

    if (!this.token || !this.email) {
      this.tokenCheckCompleted = true;
      return;
    }

    this.initiateForm();
    this.form.setValue({
      'token': this.token,
      'email': this.email
    });

    this.authService.validateResetPasswordToken(this.email, this.token)
      .subscribe(
        (response) => {
          if (response.success) {
            this.validToken = true;
          }
          this.tokenCheckCompleted = true;
        },
        (err) => {
          if (err.status !== 422) {
            this.errorMessage = 'We are unable to verify the password reset token. Please try again later.';
          }
          this.tokenCheckCompleted = true;
        }
      );
  }

  onFormSubmit() {
    if (this.form.isValid()) {
      FormHelper.disableButton(this.submit, 'Updating Password...');
      this.authService.resetPassword(this.form.getData())
        .subscribe(
          (response) => {
            if (response.success) {
              const roles = response.data;
              if (roles && roles.length > 0) {
                this.loginUrl = this.authService.getLoginUrl(roles[0].slug);
              }
              this.passwordUpdated = true;
            }
            FormHelper.enableButton(this.submit, 'Reset Password');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              FormHelper.setFormErrors(this.form, errors);
            }

            FormHelper.enableButton(this.submit, 'Reset Password');
          }
        );
    }
  }

  redirectToLoginPage() {
    this.router.navigate([this.loginUrl]);
  }

  private initiateForm() {
    this.form = new ValidationManager({
      'email': 'required|email',
      'token': 'required',
      'password': 'required|minLength:6',
      'password_confirmation': 'required|equalTo:password',
    });
  }
}
