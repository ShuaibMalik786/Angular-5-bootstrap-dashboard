import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormHelper } from '../../../shared/helpers/form-helper';

@Component({
  selector: 'app-ui-components',
  templateUrl: './ui-components.component.html',
})
export class UiComponentsComponent implements OnInit {
  rating = 1;
  @ViewChild('submitButton1') submitButton1: ElementRef;
  @ViewChild('submitButton2') submitButton2: ElementRef;
  @ViewChild('submitButton3') submitButton3: ElementRef;
  @ViewChild('submitButton4') submitButton4: ElementRef;
  @ViewChild('submitButton5') submitButton5: ElementRef;
  constructor() {
  }

  ngOnInit() {
  }

  submit1() {
    FormHelper.disableButton(this.submitButton1, "Submitting...");
    setTimeout(() => {
      FormHelper.enableButton(this.submitButton1, 'Submit');
    }, 2000);
  }

  submit2() {
    FormHelper.disableButton(this.submitButton2, "<i class='fa fa-circle-o-notch fa-spin fa-fw'></i>");
    setTimeout(() => {
      FormHelper.enableButton(this.submitButton2, 'Submit');
    }, 2000);
  }

  submit3() {
    FormHelper.disableButton(this.submitButton3, "<i class='fa fa-spinner  fa-spinner fa-pulse fa-fw'></i>");
    setTimeout(() => {
      FormHelper.enableButton(this.submitButton3, 'Submit');
    }, 2000);
  }

  submit4() {
    FormHelper.disableButton(this.submitButton4, "<i class='fa fa-refresh fa-spin  fa-fw'></i>");
    setTimeout(() => {
      FormHelper.enableButton(this.submitButton4, 'Submit');
    }, 2000);
  }

  submit5() {
    FormHelper.disableButton(this.submitButton5, "<i class='fa fa-cog fa-spin  fa-fw'></i>");
    setTimeout(() => {
      FormHelper.enableButton(this.submitButton5, 'Submit');
    }, 2000);
  }
}
