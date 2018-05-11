import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ValidationManager } from 'ng2-validation-manager';
import swal from 'sweetalert2';

import { CommonApiService } from '../../shared/services/api/common-api.service';

import { ApiHelper } from '../../shared/helpers/api-helper';
import { FormHelper } from '../../shared/helpers/form-helper';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contactForm;
  @ViewChild('submit') submit: ElementRef;

  constructor(private commonApiService: CommonApiService) {
  }

  ngOnInit() {
    this.initiateContactForm();
  }

  onFormSubmit() {
    if (this.contactForm.isValid()) {
      FormHelper.disableButton(this.submit, 'Submitting...');
      this.commonApiService.saveContactForm(this.contactForm.getData())
        .subscribe(
          (response) => {
            if (response.success) {
              this.contactForm.reset();
              swal(
                'Success',
                'Message successfully sent. We will get back to you within 24 hours.',
                'success'
              );
            }
            FormHelper.enableButton(this.submit, 'Submit');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              this.contactForm.errors = errors;
            }

            FormHelper.enableButton(this.submit, 'Submit');
          }
        );
    }
  }

  private initiateContactForm() {
    this.contactForm = new ValidationManager({
      'name': 'required|maxLength:50',
      'email': 'required|maxLength:150',
      'mobile': 'required|digits',
      'message': 'required|minLength:30|maxLength:3000'
    });
  }
}
