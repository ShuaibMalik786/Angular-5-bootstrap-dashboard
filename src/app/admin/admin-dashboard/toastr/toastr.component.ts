import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
})
export class ToastrComponent implements OnInit {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!', { showCloseButton: true });
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!', { showCloseButton: true });
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!', { showCloseButton: true });
  }

  showInfo() {
    this.toastr.info('Just some information for you.', null, { showCloseButton: true });
  }

  showCustom() {
    this.toastr.custom(
      '<span style="color: red">Message in red.</span>',
      null,
      {
        enableHTML: true,
        showCloseButton: true
      }
    );
  }


  showSuccess1() {
    this.toastr.success('This toast will dismiss on click.', null, { dismiss: 'click' });
  }

  showError1() {
    this.toastr.error('This toast will dismiss on click.', null, { dismiss: 'click' });
  }

  showWarning1() {
    this.toastr.warning('This toast will dismiss on click.', null, { dismiss: 'click' });
  }

  showInfo1() {
    this.toastr.info('This toast will dismiss on click.', null, { dismiss: 'click' });
  }

  showCustom1() {
    this.toastr.custom(
      '<span style="color: red">Message in red.</span>',
      null,
      {
        enableHTML: true,
        dismiss: 'click'
      });
  }


}
