import { Injectable } from '@angular/core';

import { ApiHelperService } from './api-helper.service';
import { ApiService } from './api.service';

@Injectable()
export class AdminApiService {

  constructor(private apiService: ApiService) {
  }

  getInfo() {
    const apiUrl = ApiHelperService.getApiUrl('admin/info');
    return this.apiService.get(apiUrl);
  }

  updateUserProfile(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('user/profile');
    return this.apiService.post(apiUrl, data);
  }

  getVendors(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors');
    return this.apiService.get(apiUrl, params);
  }

  getNews(params: object = {}) {
    const apiUrl = 'https://newsapi.org/v2/top-headlines';
    return this.apiService.get(apiUrl, params);
  }

  getVendor(id: string | number) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors/' + id);
    return this.apiService.get(apiUrl);
  }

  updateVendorCommission(data: object, vendorId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors/' + vendorId + '/commission-rate');
    return this.apiService.post(apiUrl, data);
  }

  unapproveVendor(data: object, vendorId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors/' + vendorId + '/status');
    return this.apiService.post(apiUrl, data);
  }

  approveVendor(data: object, vendorId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors/' + vendorId + '/status');
    return this.apiService.post(apiUrl, data);
  }

  getCities() {
    const apiUrl = ApiHelperService.getApiUrl('/cities');
    return this.apiService.get(apiUrl);
  }

  getStates() {
    const apiUrl = ApiHelperService.getApiUrl('/states');
    return this.apiService.get(apiUrl);
  }

  getVendorCities(id: string | number, params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors/' + id + '/cities');
    return this.apiService.get(apiUrl, params);
  }

  getVendorStates(id: string | number, params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/vendors/' + id + '/states');
    return this.apiService.get(apiUrl, params);
  }

  submitCities(id: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/pam/vendors/' + id + '/allowed-cities');
    return this.apiService.post(apiUrl, data);
  }

  submitStates(id: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/pam/vendors/' + id + '/allowed-cities');
    return this.apiService.post(apiUrl, data);
  }

  removeVendorStates(id: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/pam/vendors/' + id + '/remove-allowed-cities');
    return this.apiService.post(apiUrl, data);
  }

  removeVendorCities(id: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/pam/vendors/' + id + '/remove-allowed-cities');
    return this.apiService.post(apiUrl, data);
  }

  submitOfficeCities(id: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/pam/vendors/' + id + '/office-cities');
    return this.apiService.post(apiUrl, data);
  }

  getOfficeCities() {
    const apiUrl = ApiHelperService.getApiUrl('/pam-office-cities');
    return this.apiService.get(apiUrl);
  }

  getDropdownCorporateList() {
    const apiUrl = ApiHelperService.getApiUrl('/admin/corporates');
    return this.apiService.get(apiUrl);
  }

  getRegisteredCorporates(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/corporate/corporates');
    return this.apiService.get(apiUrl, params);
  }

  getCorporateRegistered(corporateId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/corporate/corporates/' + corporateId);
    return this.apiService.get(apiUrl);
  }

  approveCorporate(corporateId: string | number) {
    let data = {};
    const apiUrl = ApiHelperService.getApiUrl('/admin/corporate/corporates/' + corporateId + '/approve');
    return this.apiService.post(apiUrl, data);
  }

  sendInvite(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/corporate/invitations');
    return this.apiService.post(apiUrl, data);
  }

  getInvitations(httpParams: object) {
    const apiUrl = ApiHelperService.getApiUrl('/admin/corporate/invitations');
    return this.apiService.get(apiUrl, httpParams);
  }

  getInvitation(invitationId: string | number, httpParams: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/invitations/${invitationId}`);
    return this.apiService.get(apiUrl, httpParams);
  }

  enableInvitation(invitationId: string | number, active: any) {
    if (active === true) {
      active = 1;
    } else {
      active = 0;
    }
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/invitations/${invitationId}`);
    return this.apiService.put(apiUrl, { active });
  }

  deleteInvitation(invitationId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/invitations/${invitationId}`);
    return this.apiService.delete(apiUrl);
  }

  getPackages() {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate-packages`);
    return this.apiService.get(apiUrl);
  }

  getSubscriptions(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/subscriptions`);
    return this.apiService.get(apiUrl, params);
  }

  getSubscription(subscriptionId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/subscriptions/${subscriptionId}`);
    return this.apiService.get(apiUrl);
  }

  updateSubscription(subscriptionId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/subscriptions/${subscriptionId}`);
    return this.apiService.post(apiUrl, data);
  }

  getUpdateableSubscriptionStatuses() {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/updateable-subscription-statuses`);
    return this.apiService.get(apiUrl);
  }

  addSubscription(data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/subscriptions`);
    return this.apiService.post(apiUrl, data);
  }

  getCorporateListings(httpParams: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/listings`);
    return this.apiService.get(apiUrl, httpParams);
  }

  getRelocations(httpParams: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/relocations`);
    return this.apiService.get(apiUrl, httpParams);
  }

  enableListedCorporate(corporateId: string | number, active: boolean) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/listings/${corporateId}/update`);
    return this.apiService.post(apiUrl, { active });
  }

  getUsers(httpParams: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/users`);
    return this.apiService.get(apiUrl, httpParams);
  }

  loginAsUser(userId: string | number, data: object = {}) {
    const apiUrl = ApiHelperService.getSpaApiUrl(`admin/users/${userId}/login-as-user`);
    return this.apiService.post(apiUrl, data);
  }

  updateStatus(userId: string | number, active: boolean) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/users/${userId}/status`);
    return this.apiService.post(apiUrl, { active });
  }

  getRoles() {
    const apiUrl = ApiHelperService.getApiUrl(`admin/roles`);
    return this.apiService.get(apiUrl);
  }

  getUser(userId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/users/${userId}`);
    return this.apiService.get(apiUrl);
  }

  addUser(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('admin/users');
    return this.apiService.post(apiUrl, data);
  }

  updateUser(userId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/users/${userId}`);
    return this.apiService.post(apiUrl, data);
  }

  updateUserPassword(userId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/users/${userId}/password`);
    return this.apiService.post(apiUrl, data);
  }

  getPayments(httpParams: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/user-payments`);
    return this.apiService.get(apiUrl, httpParams);
  }

  getQuotation(quotationId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/quotations/${quotationId}`);
    return this.apiService.get(apiUrl);
  }

  getUserInvoice(invoiceId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/users/invoices/${invoiceId}`);
    return this.apiService.get(apiUrl);
  }

  getConnectionInventory(connectionId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/connections/${connectionId}/inventories`);
    return this.apiService.get(apiUrl);
  }

  getRelocationInventory(relocationId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/relocations/${relocationId}/inventories`);
    return this.apiService.get(apiUrl);
  }

  getRelocation(relocationId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/relocations/${relocationId}`);
    return this.apiService.get(apiUrl);
  }

  scheduleAppointment(connectionId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/connections/${connectionId}/appointments`);
    return this.apiService.post(apiUrl, data);
  }

  downloadPamUserInvoice(invoiceId: string | number, filename?: string) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/users/invoices/${invoiceId}/download`);
    return ApiHelperService.downloadFile(this.apiService, apiUrl, filename);
  }

  shareInventoryWithAllConnections(relocationId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/relocations/${relocationId}/share-inventory`);
    return this.apiService.post(apiUrl, data);
  }

  getConnection(connectionId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/connections/${connectionId}`);
    return this.apiService.get(apiUrl);
  }

  shareInventory(connectionId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/connections/${connectionId}/share-inventory`);
    return this.apiService.post(apiUrl, data);
  }

  updateTimeSlots(appointmentId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/appointments/${appointmentId}`);
    return this.apiService.post(apiUrl, data);
  }

  downloadPamQuotation(quotationId: string | number, filename?: string) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/quotations/${quotationId}/download`);
    return ApiHelperService.downloadFile(this.apiService, apiUrl, filename);
  }

  downloadPamVendorQuotation(quotationId: string | number, filename?: string) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/quotations/${quotationId}/download/vendor`);
    return ApiHelperService.downloadFile(this.apiService, apiUrl, filename);
  }

  getConnections(httpParams: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/pam/connections');
    return this.apiService.get(apiUrl, httpParams);
  }

  updateRelocation(relocationId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/relocations/${relocationId}`);
    return this.apiService.post(apiUrl, data);
  }

  addOrUpdateRelocationInventory(relocationId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/relocations/${relocationId}/inventories`);
    return this.apiService.post(apiUrl, data);
  }

  getGSTIN(vendorId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/vendors/${vendorId}/gstin-sac-numbers`);
    return this.apiService.get(apiUrl);
  }

  generateQuotation(connectionId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/connections/${connectionId}/quotations`);
    return this.apiService.post(apiUrl, data);
  }

  updateQuotation(quotationId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/quotations/${quotationId}`);
    return this.apiService.post(apiUrl, data);
  }

  getDashboardStatistics() {
    const apiUrl = ApiHelperService.getApiUrl('admin/dashboard-statistics');
    return this.apiService.get(apiUrl);
  }

  vendorBankInfoUpdateStatus(vendorId: number | string, enabled: boolean) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/vendors/${vendorId}/bank-info-update`);
    return this.apiService.post(apiUrl, {
      can_update_bank_info: enabled
    });
  }

  vendorBusinessInfoUpdateStatus(vendorId: number | string, enabled: boolean) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/pam/vendors/${vendorId}/business-info-update`);
    return this.apiService.post(apiUrl, {
      can_update_business_info: enabled
    });
  }

  listSupportRequests(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/support-tickets`);
    return this.apiService.get(apiUrl, params);
  }

  getSupportRequest(requestId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/support-tickets/${requestId}`);
    return this.apiService.get(apiUrl);
  }

  personalBookings(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/bookings/personal-bookings`);
    return this.apiService.get(apiUrl, params);
  }

  personalBooking(BookingId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/bookings/${BookingId}`);
    return this.apiService.get(apiUrl);
  }

  cancelPersonalBooking(bookingId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/bookings/${bookingId}/cancel`);
    return this.apiService.post(apiUrl, data);
  }

  downloadHotelInvoice(bookingId: string | number, filename?: string) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/bookings/${bookingId}/invoice`);
    return ApiHelperService.downloadFile(this.apiService, apiUrl, filename);
  }

  // Relocation requests
  listRelocationRequests(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/corporate/relocation-requests');
    return this.apiService.get(apiUrl, params);
  }

  viewRelocationRequest(requestId: string | number, params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/relocation-requests/${requestId}`);
    return this.apiService.get(apiUrl, params);
  }

  // Corporate Reservations
  getCorporateReservationList(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/reservations/business`);
    return this.apiService.get(apiUrl, params);
  }

  viewCorporateReservation(id: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/reservations/${id}`);
    return this.apiService.get(apiUrl);
  }

  cancelHotelReservation(reservationId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/reservations/${reservationId}/cancel`);
    return this.apiService.post(apiUrl, data);
  }

  // Corporate Booking
  listHotelBookings(params: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/bookings/business`);
    return this.apiService.get(apiUrl, params);
  }

  viewHotelBooking(bookingId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/bookings/${bookingId}`);
    return this.apiService.get(apiUrl);
  }

  // Travel-requests
  getTravelRequestList(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/corporate/travel-request');
    return this.apiService.get(apiUrl, params);
  }

  getTravelRequest(travelRequestId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/travel-request/${travelRequestId}`);
    return this.apiService.get(apiUrl);
  }

  getHotelImages(hotelId: string | number, params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/${hotelId}/images`);
    return this.apiService.get(apiUrl, params);
  }

  setHotelFeaturedImage(hotelId: string | number, imageId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/${hotelId}/images/${imageId}/main-image`);
    return this.apiService.post(apiUrl, {});
  }

  deleteHotelImage(hotelId: string | number, imageId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/${hotelId}/images/${imageId}`);
    return this.apiService.delete(apiUrl);
  }

  getHotel(hotelId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/${hotelId}`);
    return this.apiService.get(apiUrl);
  }

  uploadHotelImages(hotelId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/hotels/${hotelId}/images`);
    return this.apiService.post(apiUrl, data);
  }

  // Corporate Hotels
  listHotels(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('admin/corporate/hotels');
    return this.apiService.get(apiUrl, params);
  }

  getCorporateHotel(hotelId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/hotels/${hotelId}`);
    return this.apiService.get(apiUrl);
  }

  updateHotelStatus(hotelId: string | number, active: boolean) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/hotels/${hotelId}/status`);
    return this.apiService.post(apiUrl, {
      active: active
    });
  }

  deleteHotel(hotelId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/hotels/${hotelId}`);
    return this.apiService.delete(apiUrl);
  }

  updateCorporateHotelApprovalStatus(corporateHotelId: string | number, status: number) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/hotels/${corporateHotelId}/approve`);
    return this.apiService.post(apiUrl, {
      action: status
    });
  }

  updateHotel(hotelId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`admin/corporate/hotels/${hotelId}`);
    return this.apiService.post(apiUrl, data);
  }

  // HL hotels
  getHlHotel(hotelId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`hl/hotels/${hotelId}`);
    return this.apiService.get(apiUrl);
  }

  listHlHotels(params: object = {}) {
    const apiUrl = ApiHelperService.getApiUrl('hl/hotels');
    return this.apiService.get(apiUrl, params);
  }

  addExistingHotel(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('hl/hotels/add-existing');
    return this.apiService.post(apiUrl, data);
  }

  addHotel(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('hl/hotels');
    return this.apiService.post(apiUrl, data);
  }

  updateHlHotelStatus(hotelId: string | number, active: boolean) {
    const apiUrl = ApiHelperService.getApiUrl(`hl/hotels/${hotelId}/status`);
    return this.apiService.post(apiUrl, {
      active: active
    });
  }

  deleteHlHotel(hotelId: string | number) {
    const apiUrl = ApiHelperService.getApiUrl(`hl/hotels/${hotelId}`);
    return this.apiService.delete(apiUrl);
  }

  updateHlHotel(hotelId: string | number, data: object) {
    const apiUrl = ApiHelperService.getApiUrl(`hl/hotels/${hotelId}/edit`);
    return this.apiService.post(apiUrl, data);
  }
}
