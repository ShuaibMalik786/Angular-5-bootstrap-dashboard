import { Router } from '@angular/router/src';

import * as _ from 'lodash';

import { SessionStorageService } from '../services/storage/session-storage.service';

import { VendorInfo } from '../models/vendor-info-model';
import { RelocationInfo } from '../models/relocation-info-model';
import { StorageConstant } from '../constants/storage';

export class PamHelper {

  static setInfo(info: object) {
    SessionStorageService.set(StorageConstant.VENDOR_INFO, info);
  }

  static clearInfo() {
    SessionStorageService.remove(StorageConstant.VENDOR_INFO);
  }

  static getInfo() {
    return SessionStorageService.get(StorageConstant.VENDOR_INFO) as VendorInfo;
  }

  static getId(): string | null {
    const info = PamHelper.getInfo();
    return info ? info.id : null;
  }

  static getApprovalFlowText(flowType: string) {
    const approvalFlows = {
      'hr-only': 'HR Manager Only',
      'hr-l1-l2': 'HR Manager <i class="fa fa-angle-double-right p-l-7 p-r-7"></i> Line 1 Manager <i class="fa fa-angle-double-right p-l-7 p-r-7"></i> Line 2 Manager',
      'l1-l2-only': 'Line 1 Manager <i class="fa fa-angle-double-right p-l-7 p-r-7"></i> Line 2 Manager',
      'l1-l2-hr': 'Line 1 Manager <i class="fa fa-angle-double-right p-l-7 p-r-7"></i> Line 2 Manager <i class="fa fa-angle-double-right p-l-7 p-r-7"></i> HR Manager',
    };

    if (approvalFlows.hasOwnProperty(flowType)) {
      return approvalFlows[flowType];
    }

    return 'Unknown approval flow';
  }

  static getPropertyTypes() {
    return [
      '1 BHK',
      '2 BHK',
      '3 BHK',
      '4 BHK',
      '5 BHK',
      'Villa',
      'Row House'
    ];
  }

  static getFloorTypes() {
    return [
      'Ground',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10+'
    ];
  }

  static getRelocationStatusClass(status: string) {
    const successStatus = [
      'quick-connected', 'premove-survey-confirmed', 'payment-complete', 'loading-complete',
      'unloading-complete', 'relocation-completed', 'quotation-generated', 'quotation-confirmed',
      'survey-completed', 'connection-completed', 'appointment-confirmed', 'appointment-completed'
    ];

    const dangerStatus = [
      'vendor-closed-connection', 'connection-closed', 'appointment-rejected',
      'appointment-closed', 'relocation-closed'
    ];

    const infoStatus = [
      'relocation-requested', 'premove-survey-requested', 'inventory-uploaded', 'inventory-shared',
      'relocation-initiated', 'in-transit', 'relocation-completion-initiated', 'surveyor-assigned',
      'invoice-generated', 'loading-manager-assigned', 'unloading-manager-assigned', 'appointment-requested'
    ];

    const warningStatus = ['appointment-rescheduled'];

    if (_.includes(successStatus, status)) {
      return 'label-success';
    } else if (_.includes(dangerStatus, status)) {
      return 'label-danger';
    } else if (_.includes(infoStatus, status)) {
      return 'label-info';
    } else if (_.includes(warningStatus, status)) {
      return 'label-warning';
    }

    return 'label-default';
  }

  static getTimeSlots() {
    return [
      { startTime: '09:00:00', endTime: '10:00:00', slot: '09:00 AM - 10:00 AM' },
      { startTime: '09:30:00', endTime: '10:30:00', slot: '09:30 AM - 10:30 AM' },
      { startTime: '10:00:00', endTime: '11:00:00', slot: '10:00 AM - 11:00 AM' },
      { startTime: '10:30:00', endTime: '11:30:00', slot: '10:30 AM - 11:30 AM' },
      { startTime: '11:00:00', endTime: '12:00:00', slot: '11:00 AM - 12:00 AM' },
      { startTime: '11:30:00', endTime: '12:30:00', slot: '11:30 AM - 12:30 PM' },
      { startTime: '12:00:00', endTime: '13:00:00', slot: '12:00 PM - 01:00 PM' },
      { startTime: '12:30:00', endTime: '13:30:00', slot: '12:30 PM - 01:30 PM' },
      { startTime: '13:00:00', endTime: '14:00:00', slot: '01:00 PM - 02:00 PM' },
      { startTime: '13:30:00', endTime: '14:30:00', slot: '01:30 PM - 02:30 PM' },
      { startTime: '14:00:00', endTime: '15:00:00', slot: '02:00 PM - 03:00 PM' },
      { startTime: '14:30:00', endTime: '15:30:00', slot: '02:30 PM - 03:30 PM' },
      { startTime: '15:00:00', endTime: '16:00:00', slot: '03:00 PM - 04:00 PM' },
      { startTime: '15:30:00', endTime: '16:30:00', slot: '03:30 PM - 04:30 PM' },
      { startTime: '16:00:00', endTime: '17:00:00', slot: '04:00 PM - 05:00 PM' },
      { startTime: '16:30:00', endTime: '17:30:00', slot: '04:30 PM - 05:30 PM' },
      { startTime: '17:00:00', endTime: '18:00:00', slot: '05:00 PM - 06:00 PM' }
    ];
  }

  static getQuotationStatusClass(status: string) {
    if (status === 'Paid') {
      return 'label-success';
    } else if (status === 'Generated') {
      return 'label-info';
    } else if (status === 'Confirmed') {
      return 'label-default';
    }

    return 'label-default';
  }

  static redirectToRelocationEdit(router: Router, relocationInfo: RelocationInfo) {
    if (relocationInfo.can_update_whole_relocation) {
      router.navigate(['/packers-and-movers/relocation', relocationInfo.uuid, 'edit']);
    } else {
      router.navigate(['/user/pam/relocations', relocationInfo.id, 'edit']);
    }
  }

  static redirectToShareInventory(router: Router, relocationInfo: RelocationInfo) {
    const path = relocationInfo.has_inventory ? 'share-inventory' : 'upload-inventory';

    router.navigate(['/packers-and-movers/relocation', relocationInfo.uuid, path]);
  }
}
