import { SessionStorageService } from '../services/storage/session-storage.service';
import { StorageConstant } from '../constants/storage';
import { CorporateInfo } from '../models/corporate-info-model';

export class CorporateHelper {

  static setInfo(info: object) {
    SessionStorageService.set(StorageConstant.CORPORATE_INFO, info);
  }

  static clearInfo() {
    SessionStorageService.remove(StorageConstant.CORPORATE_INFO);
  }

  static getInfo() {
    return SessionStorageService.get(StorageConstant.CORPORATE_INFO) as CorporateInfo;
  }

  static getId(): string | null {
    const info = CorporateHelper.getInfo();
    return info ? info.id : null;
  }

  static getIndustryTypes() {
    return [
      'Accounting-Tax/Consulting',
      'Advertising/PR/Event Management',
      'Agriculture/Forestry/Fishing',
      'Apparels/Garments',
      'Architecture/Interior Design',
      'Automobiles/Auto Component/Auto Ancillary',
      'Banking',
      'Biotechnology/Pharmaceutical/Medicine',
      'CRM/CallCentres/BPO/IT/Med.Trans',
      'Catering/Food Services/Restaurant',
      'Other'
    ];
  }

  static getEmployeeSizes() {
    return [
      '1-10',
      '11-50',
      '51-200',
      '201-500',
      '501-1000',
      '1001-5000',
      '5001-10,000',
      '10,000+'
    ];
  }

  static containerTypes() {
    return [
      { slug: 'open', name: 'Open' },
      { slug: 'closed', name: 'Closed' },
      { slug: 'open-shared', name: 'Open Shared' },
      { slug: 'close-shared', name: 'Closed Shared' },
    ];
  }

  static containerTypeText(type: string) {
    const types = {
      'open': 'Open',
      'closed': 'Closed',
      'open-shared': 'Open Shared',
      'close-shared': 'Closed Shared',
    };

    if (types.hasOwnProperty(type)) {
      return types[type];
    }

    return 'Unknown container type';
  }

  static getCityTierText(tier: string | number) {
    if (tier == 1) {
      return 'Tier 1';
    } else if (tier == 2) {
      return 'Tier 2';
    } else if (tier == 3) {
      return 'Tier 3';
    }

    return 'N/A';
  }

  static getCorporateAccountRequestStatusClass(status: string) {
    if (status === 'approved') {
      return 'label-success';
    } else if (status === 'declined') {
      return 'label-danger';
    } else if (status === 'initiated-add-request') {
      return 'label-primary';
    } else if (status === 'pending') {
      return 'label-warning';
    } else if (status === 'updated-and-approved') {
      return 'label-success';
    } else if (status === 'cancelled') {
      return 'label-warning';
    }

    return 'label-default';
  }

  static getCorporateApprovalStatus(status: string) {
    if (status === 'approved') {
      return 'label-success';
    } else if (status === 'confirmed') {
      return 'label-success';
    } else if (status === 'declined') {
      return 'label-danger';
    } else if (status === 'pending') {
      return 'label-warning';
    } else if (status === 'cancelled') {
      return 'label-warning';
    } else if (status === 'expired') {
      return 'label-danger';
    }

    return 'label-default';
  }

  static getCorporateAccountRequestStatusText(status: string) {
    const statuses = {
      'initiated-add-request': 'Initiated Add Request',
      'pending': 'Pending',
      'approved': 'Approved',
      'updated-and-approved': 'Updated and Approved.',
      'declined': 'Declined',
      'cancelled': 'Cancelled'
    };

    if (statuses.hasOwnProperty(status)) {
      return statuses[status];
    }

    return 'Unknown status';
  }
}
