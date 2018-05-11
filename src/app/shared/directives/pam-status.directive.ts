import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPamStatus]'
})
export class PamStatusDirective implements OnInit {

  info = [
    'relocation-requested',
    'in-transit',
    'relocation-initiated',
    'premove-survey-requested',
    'inventory-uploaded',
    'relocation-completion-initiated',
    'appointment-requested'
  ];
  success = [
    'inventory-shared',
    'quick-connected',
    'premove-survey-confirmed',
    'payment-complete',
    'loading-complete',
    'unloading-complete',
    'relocation-completed',
    'quotation-confirmed',
    'surveyor-assigned',
    'survey-completed',
    'loading-manager-assigned',
    'unloading-manager-assigned',
    'connection-completed',
    'appointment-confirmed',
    'appointment-completed'
  ];
  warning = [
    'quotation-generated',
    'invoice-generated',
    'appointment-rescheduled'
  ];
  danger = [
    'relocation-closed',
    'vendor-closed-connection',
    'connection-closed',
    'appointment-rejected',
    'appointment-closed',
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
