import { Injectable } from '@angular/core';

import { ApiHelperService } from './api-helper.service';
import { ApiService } from './api.service';
import { CacheService } from '../cache/cache.service';

import { DatetimeHelper } from '../../helpers/datetime-helper';

@Injectable()
export class CommonApiService {

  constructor(private apiService: ApiService,
              private cacheService: CacheService) {
  }

  getStates(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('states');

    return this.cacheService.get(
      `${apiUrl}|${JSON.stringify(params)}`,
      this.apiService.get(apiUrl, params),
      DatetimeHelper.hoursToSeconds(6)
    );
  }

  getCities(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('cities');

    return this.cacheService.get(
      `${apiUrl}|${JSON.stringify(params)}`,
      this.apiService.get(apiUrl, params),
      DatetimeHelper.hoursToSeconds(6)
    );
  }

  getHotelCities(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('hotel-cities');

    return this.cacheService.get(
      `${apiUrl}|${JSON.stringify(params)}`,
      this.apiService.get(apiUrl, params),
      DatetimeHelper.hoursToSeconds(6)
    );
  }

  getCorporateAccount() {
    const apiUrl = ApiHelperService.getApiUrl('user/corporate-account');
    return this.apiService.get(apiUrl);
  }

  getCorporateProfile() {
    const apiUrl = ApiHelperService.getApiUrl('user/corporate-profile');
    return this.apiService.get(apiUrl);
  }

  getCorporateEligibility() {
    const apiUrl = ApiHelperService.getApiUrl('user/corporate/eligibility');
    return this.apiService.get(apiUrl);
  }

  saveContactForm(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('contact');
    return this.apiService.post(apiUrl, data);
  }

  saveCorporateEnquiryForm(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('contact/corporate-enquiry');
    return this.apiService.post(apiUrl, data);
  }

  listSupportRequests(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`user/tickets`);
    return this.apiService.get(apiUrl, params);
  }

  createSupportRequest(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('user/tickets');
    return this.apiService.post(apiUrl, data);
  }

  getSupportRequest(requestId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`user/tickets/${requestId}`);
    return this.apiService.get(apiUrl);
  }

  getSupportRequestCategories() {
    const apiUrl = ApiHelperService.getApiUrl('user/ticket-categories');
    return this.apiService.get(apiUrl);
  }

  getSacCodes() {
    const apiUrl = ApiHelperService.getApiUrl('sac-codes');
    return this.apiService.get(apiUrl);
  }
}
