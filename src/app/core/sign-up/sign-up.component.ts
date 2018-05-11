import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../shared/services/auth/auth.service';
import { NotieService } from '../../shared/services/notification/notie.service';

import { ApiHelper } from '../../shared/helpers/api-helper';
import { FormHelper } from '../../shared/helpers/form-helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  sendOtpForm;
  otpVerifyForm;
  signupForm;
  otpSent = false;
  otpVerified = false;
  registered = false;
  mobileNumber;
  otpUuid;
  @ViewChild('sendOtpButton') sendOtpButton: ElementRef;
  @ViewChild('verifyOtpButton') verifyOtpButton: ElementRef;
  @ViewChild('signupButton') signupButton: ElementRef;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.initiateForm();
  }

  onSendOtp() {
    if (this.sendOtpForm.isValid()) {
      const mobile = this.sendOtpForm.getValue('mobile');
      FormHelper.disableButton(this.sendOtpButton, 'Sending OTP...');
      this.authService.sendRegistrationOtp(mobile)
        .subscribe(
          (response) => {
            if (response.success) {
              this.mobileNumber = mobile;
              this.otpUuid = response.data.uuid;
              this.otpVerifyForm.setValue('uuid', this.otpUuid);
              this.otpSent = true;
            } else {
              NotieService.error('Error encountered while sending otp');
            }
            FormHelper.enableButton(this.sendOtpButton, 'Send OTP');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              FormHelper.setFormErrors(this.sendOtpForm, errors);
            }
            FormHelper.enableButton(this.sendOtpButton, 'Send OTP');
          }
        );
    }
  }

  onVerifyOtp() {
    if (this.otpVerifyForm.isValid()) {
      FormHelper.disableButton(this.verifyOtpButton, 'Verifying OTP...');
      this.authService.validateRegistrationOtp(this.otpVerifyForm.getData())
        .subscribe(
          (response) => {
            if (response.success) {
              this.signupForm.setValue('mobile_uuid', this.otpUuid);
              this.otpVerified = true;
            } else {
              NotieService.error('Error encountered while verifying otp');
            }
            FormHelper.enableButton(this.verifyOtpButton, 'Verify OTP');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              FormHelper.setFormErrors(this.otpVerifyForm, errors);
            }
            FormHelper.enableButton(this.verifyOtpButton, 'Verify OTP');
          }
        );
    }
  }

  onSignupSubmit() {
    if (this.signupForm.isValid()) {
      FormHelper.disableButton(this.signupButton, 'Signing Up...');
      this.authService.registerUser(this.signupForm.getData())
        .subscribe(
          (response) => {
            if (response.success) {
              this.registered = true;
            } else {
              NotieService.error('Error encountered while signing up');
            }
            FormHelper.enableButton(this.signupButton, 'Signup');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              FormHelper.setFormErrors(this.signupForm, errors);
            }
            FormHelper.enableButton(this.signupButton, 'Signup');
          }
        );
    }
  }

  resetSignup() {
    this.registered = false;
    this.otpVerified = false;
    this.otpSent = false;

    this.signupForm.reset();
    this.otpVerifyForm.reset();

    this.mobileNumber = null;
    this.otpUuid = null;
  }

  private initiateForm() {
    this.sendOtpForm = new ValidationManager({
      'mobile': 'required|digits',
    });

    this.otpVerifyForm = new ValidationManager({
      'uuid': 'required',
      'otp': 'required',
    });

    this.signupForm = new ValidationManager({
      'name': 'required|maxLength:50',
      'email': 'required|maxLength:150',
      'mobile_uuid': 'required',
      'password': 'required|minLength:6',
      'password_confirmation': 'required|equalTo:password',
    });
  }
}
