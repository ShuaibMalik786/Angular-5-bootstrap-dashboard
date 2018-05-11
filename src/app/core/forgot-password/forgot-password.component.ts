import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../shared/services/auth/auth.service';
import { NotieService } from '../../shared/services/notification/notie.service';

import { ApiHelper } from '../../shared/helpers/api-helper';
import { FormHelper } from '../../shared/helpers/form-helper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  form;
  resetLinkSent = false;
  @ViewChild('submit') submit: ElementRef;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.initiateForm();
  }

  onFormSubmit() {
    if (this.form.isValid()) {
      FormHelper.disableButton(this.submit, 'Sending Reset Link...');
      this.authService.forgotPassword(this.form.getValue('email'))
        .subscribe(
          (response) => {
            if (response.success) {
              this.form.reset();
              this.resetLinkSent = true;
            } else {
              NotieService.error('Error encountered while sending reset link');
            }
            FormHelper.enableButton(this.submit, 'Send Reset Link');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              FormHelper.setFormErrors(this.form, errors);
            }
            FormHelper.enableButton(this.submit, 'Send Reset Link');
          }
        );
    }
  }

  private initiateForm() {
    this.form = new ValidationManager({
      'email': 'required|email'
    });
  }
}
