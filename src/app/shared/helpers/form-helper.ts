import { ElementRef } from '@angular/core';

import { ValidationManager } from 'ng2-validation-manager';

export class FormHelper {

  static enableButton(button: ElementRef, html?: string) {
    if (html) {
      button.nativeElement.innerHTML = html;
    }
    button.nativeElement.disabled = false;
  }

  static disableButton(button: ElementRef, html?: string) {
    if (html) {
      button.nativeElement.innerHTML = html;
    }
    button.nativeElement.disabled = true;
  }

  static setFormErrors(form: ValidationManager, errors: object) {
    form.errors = Object.assign({}, form.getErrors(), errors);
  }

  static clearFormErrors(form: ValidationManager) {
    for (const key in form.errors) {
      if (form.errors.hasOwnProperty(key)) {
        form.errors[key] = '';
      }
    }
  }
}
