import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHotelStatus]'
})
export class HotelStatusDirective implements OnInit {

  info = [
    'initiated', 'payment-initiated'
  ];
  success = [
    'confirmed', 'payment-success', 'approved'
  ];
  warning = [
    'pending', 'cancellation-failed', 'cancellation-rejected', 'cancellation-pending', 'payment-failed', 'payment-error'
  ];
  danger = [
    'failed', 'rejected', 'declined', 'cancelled', 'payment-pending', 'payment-cancelled'
  ];

  @Input() status: string;

  @HostBinding('class.label-info') private isInfo = false;
  @HostBinding('class.label-success') private isSuccess = false;
  @HostBinding('class.label-warning') private isWarning = false;
  @HostBinding('class.label-danger') private isDanger = false;

  constructor() {
  }

  ngOnInit() {
    this.assignStatus();
  }

  assignStatus() {
    if (this.info.indexOf(this.status) !== -1) {
      this.isInfo = true;
    }
    if (this.success.indexOf(this.status) !== -1) {
      this.isSuccess = true;
    }
    if (this.warning.indexOf(this.status) !== -1) {
      this.isWarning = true;
    }
    if (this.danger.indexOf(this.status) !== -1) {
      this.isDanger = true;
    }
  }

}
