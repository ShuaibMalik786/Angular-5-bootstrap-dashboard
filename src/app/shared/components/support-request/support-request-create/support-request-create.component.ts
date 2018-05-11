import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ValidationManager } from 'ng2-validation-manager';
import swal from 'sweetalert2';

import { CommonApiService } from '../../../services/api/common-api.service';
import { ApiHelper } from '../../../helpers/api-helper';
import { FormHelper } from '../../../helpers/form-helper';

@Component({
  selector: 'app-support-request-create',
  templateUrl: './support-request-create.component.html',
})
export class SupportRequestCreateComponent implements OnInit {
  form;
  categories;
  fileName;
  @ViewChild('attachment') attachment: ElementRef;
  @ViewChild('submit') submit: ElementRef;

  constructor(private commonApiService: CommonApiService) {
  }

  ngOnInit() {
    this.initiateForm();
    this.loadCategories();
  }

  onFormSubmit() {
    if (this.form.isValid()) {
      const formData = new FormData();
      formData.set('category', this.form.getValue('category'));
      formData.set('message', this.form.getValue('message'));

      const files = this.attachment.nativeElement.files;
      if (files && files[0]) {
        formData.set('attachment', files[0]);
      }

      FormHelper.disableButton(this.submit, 'Submitting...');
      this.commonApiService.createSupportRequest(formData)
        .subscribe(
          (response) => {
            if (response.success) {
              this.form.reset();
              swal(
                'Success',
                'Support request created successfully. We will get back to you within 24-48 hours.',
                'success'
              );
            }
            FormHelper.enableButton(this.submit, 'Submit');
          },
          (err) => {
            const errors = ApiHelper.resolveValidationErrors(err, true);
            if (errors) {
              this.form.errors = errors;
            }
            FormHelper.enableButton(this.submit, 'Submit');
          }
        );
    }
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileName = event.target.files[0].name;
    } else {
      this.fileName = '';
    }
  }

  private initiateForm() {
    this.form = new ValidationManager({
      'category': 'required',
      'message': 'required|minLength:30|maxLength:3000',
      'attachment': '',
      'file_name': ''
    });
  }

  private loadCategories() {
    this.commonApiService.getSupportRequestCategories()
      .subscribe(
        (response) => this.categories = response.data,
        (err) => ApiHelper.displayGenericErrorMessage(err, 'Unable to load the request categories.')
      );
  }
}
