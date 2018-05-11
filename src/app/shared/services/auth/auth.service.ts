import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { ApiHelperService } from '../api/api-helper.service';
import { ApiService } from '../api/api.service';
import { LocalStorageService } from '../storage/local-storage.service';

import { CorporateHelper } from '../../helpers/corporate-helper';
import { PamHelper } from '../../helpers/pam-helper';

import { User } from '../../models/user-model';

import { DefaultConstant } from '../../constants/default-constant';
import { RoleConstant } from '../../constants/role-constant';
import { StorageConstant } from '../../constants/storage';

@Injectable()
export class AuthService {
  redirectUrl;
  userLoggedIn = new Subject<User>();
  userUpdated = new Subject<User>();

  constructor(private apiService: ApiService) {
  }

  // API Calls
  getAuthenticatedUser() {
    const authUserUrl = ApiHelperService.getSpaApiUrl('user');
    return this.apiService.get(authUserUrl);
  }

  loginUser(data: object) {
    const loginUrl = ApiHelperService.getSpaApiUrl('user/login');
    return this.apiService.post(loginUrl, data);
  }

  loginPamVendor(data: object) {
    const loginUrl = ApiHelperService.getSpaApiUrl('pam/master/login');
    return this.apiService.post(loginUrl, data);
  }

  loginPamEmployee(data: object) {
    const loginUrl = ApiHelperService.getSpaApiUrl('pam/employee/login');
    return this.apiService.post(loginUrl, data);
  }

  loginCorporate(data: object) {
    const loginUrl = ApiHelperService.getSpaApiUrl('corporate/login');
    return this.apiService.post(loginUrl, data);
  }

  loginAdmin(data: object) {
    const loginUrl = ApiHelperService.getSpaApiUrl('admin/login');
    return this.apiService.post(loginUrl, data);
  }

  logout() {
    const apiUrl = ApiHelperService.getSpaApiUrl('logout');
    return this.apiService.post(apiUrl, {});
  }

  sendUserLoginOtp(mobile: string) {
    const apiUrl = ApiHelperService.getApiUrl('user/login/send-otp');
    return this.apiService.post(apiUrl, {
      mobile: mobile
    });
  }

  // Registration API

  sendRegistrationOtp(mobile: string) {
    const apiUrl = ApiHelperService.getApiUrl('user/register/send-otp');
    return this.apiService.post(apiUrl, {
      mobile: mobile
    });
  }

  validateRegistrationOtp(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('user/register/validate-otp');
    return this.apiService.post(apiUrl, data);
  }

  registerUser(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('user/register');
    return this.apiService.post(apiUrl, data);
  }

  registerCorporateEmployee(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('corporate-employee/register');
    return this.apiService.post(apiUrl, data);
  }

  registerCorporate(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('corporate/register');
    return this.apiService.post(apiUrl, data);
  }

  registerPamVendor(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('pam/register');
    return this.apiService.post(apiUrl, data);
  }

  validateCorporateInvitation(invitationId: string, token: string) {
    const apiUrl = ApiHelperService.getApiUrl('corporate/validate-invitation');
    return this.apiService.post(apiUrl, {
      invitation_id: invitationId,
      token: token,
    });
  }

  validateEmployeeSignupInvitation(invitationId: string, token: string) {
    const apiUrl = ApiHelperService.getApiUrl('corporate-employee/register/validate-invite');
    return this.apiService.post(apiUrl, {
      invitation_id: invitationId,
      token: token,
    });
  }

  // Email confirmation API

  confirmEmail(email: string, token: string) {
    const apiUrl = ApiHelperService.getApiUrl('email/confirm');
    return this.apiService.post(apiUrl, {
      email: email,
      token: token,
    });
  }

  confirmCorporateEmail(email: string, token: string) {
    const apiUrl = ApiHelperService.getApiUrl('corporate-email/confirm');
    return this.apiService.post(apiUrl, {
      email: email,
      token: token,
    });
  }

  resendConfirmationEmail(email: string) {
    const apiUrl = ApiHelperService.getApiUrl('email/resend-confirmation');
    return this.apiService.post(apiUrl, {
      email: email
    });
  }

  // Password Forgot/Reset API

  forgotPassword(email: string) {
    const apiUrl = ApiHelperService.getApiUrl('password/forgot');
    return this.apiService.post(apiUrl, {
      email: email
    });
  }

  validateResetPasswordToken(email: string, token: string) {
    const apiUrl = ApiHelperService.getApiUrl('password/reset/validate-token');
    return this.apiService.post(apiUrl, {
      email: email,
      token: token,
    });
  }

  resetPassword(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('password/reset');
    return this.apiService.post(apiUrl, data);
  }

  sendPasswordResetOtp(username: string) {
    const apiUrl = ApiHelperService.getApiUrl('employee/password/forgot');
    return this.apiService.post(apiUrl, {
      username: username
    });
  }

  resetPasswordWithOtp(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('employee/password/reset');
    return this.apiService.post(apiUrl, data);
  }

  validateSetPasswordToken(email: string, token: string) {
    const apiUrl = ApiHelperService.getApiUrl('password/set/validate-token');
    return this.apiService.post(apiUrl, {
      email: email,
      token: token,
    });
  }

  setPassword(data: object) {
    const apiUrl = ApiHelperService.getApiUrl('password/set');
    return this.apiService.post(apiUrl, data);
  }

  // Helper Methods

  isUserLoggedIn(): boolean {
    return !!LocalStorageService.get(StorageConstant.LOGGED_IN);
  }

  setLoggedInUser(user: any) {
    if (user && !user.profile_picture_url) {
      user.profile_picture_url = DefaultConstant.PROFILE_PICTURE;
    }

    LocalStorageService.set(StorageConstant.LOGGED_IN, true);
    LocalStorageService.set(StorageConstant.LOGGED_IN_USER, user);
    this.userUpdated.next(user as User);
  }

  clearLoggedInUser() {
    LocalStorageService.remove(StorageConstant.LOGGED_IN);
    LocalStorageService.remove(StorageConstant.LOGGED_IN_USER);
    this.userUpdated.next({} as User);
  }

  getUser(): User {
    return LocalStorageService.get(StorageConstant.LOGGED_IN_USER) as User;
  }

  getUserId(): number {
    return this.getUser().id;
  }

  getUserProfilePic() {
    const user = this.getUser();

    if (user && user.profile_picture_url) {
      return user.profile_picture_url;
    }

    return DefaultConstant.PROFILE_PICTURE;
  }

  getUserRoles() {
    const user = this.getUser();

    if (user && user.hasOwnProperty('roles')) {
      return user.roles.data.map(role => role.slug);
    }

    return [];
  }

  userHasRole(roles: Array<string>, requireAll = false): boolean {
    const userRoles = this.getUserRoles();
    const matchedRoles = _.intersection(userRoles, roles);

    if (requireAll) {
      return matchedRoles.length === roles.length;
    }

    return !!matchedRoles.length;
  }

  getLoginUrlFromRouteUrl(routeUrl: string): string {
    const trimChar = '/';
    routeUrl = _.trim(routeUrl, trimChar);

    if (_.startsWith(routeUrl, _.trim(RoleConstant.USER_DASHBOARD_URL, trimChar))) {
      return RoleConstant.USER_LOGIN_URL;
    } else if (_.startsWith(routeUrl, _.trim(RoleConstant.PAM_DASHBOARD_URL, trimChar))) {
      return RoleConstant.PAM_LOGIN_URL;
    } else if (_.startsWith(routeUrl, _.trim(RoleConstant.CORPORATE_DASHBOARD_URL, trimChar))) {
      return RoleConstant.CORPORATE_LOGIN_URL;
    } else if (_.startsWith(routeUrl, _.trim(RoleConstant.ADMIN_DASHBOARD_URL, trimChar))) {
      return RoleConstant.ADMIN_LOGIN_URL;
    }

    return RoleConstant.USER_LOGIN_URL;
  }

  getLoginUrl(role?: string): string {
    return this.getLoginOrDashboardUrl(true, role);
  }

  getDashboardUrl(role?: string): string {
    return this.getLoginOrDashboardUrl(false, role);
  }

  getLoginOrDashboardUrl(loginUrl: boolean, role?: string): string {
    if (!role) {
      const roles = this.getUserRoles();

      if (roles.length === 0) {
        return loginUrl ? RoleConstant.USER_LOGIN_URL : RoleConstant.USER_DASHBOARD_URL;
      }

      role = roles[0];
    }

    if (RoleConstant.USER_ROLES.includes(role)) {
      return loginUrl ? RoleConstant.USER_LOGIN_URL : RoleConstant.USER_DASHBOARD_URL;
    } else if (RoleConstant.PAM_ROLES.includes(role)) {
      return loginUrl ? RoleConstant.PAM_LOGIN_URL : RoleConstant.PAM_DASHBOARD_URL;
    } else if (RoleConstant.CORPORATE_ROLES.includes(role)) {
      return loginUrl ? RoleConstant.CORPORATE_LOGIN_URL : RoleConstant.CORPORATE_DASHBOARD_URL;
    } else if (RoleConstant.ADMIN_ROLES.includes(role)) {
      return loginUrl ? RoleConstant.ADMIN_LOGIN_URL : RoleConstant.ADMIN_DASHBOARD_URL;
    }

    return loginUrl ? RoleConstant.USER_LOGIN_URL : RoleConstant.USER_DASHBOARD_URL;
  }

  logoutAndRedirect(router: Router, loginUrl: string, redirectUrl: string = null) {
    this.logout()
      .subscribe(() => this.flushUserAndRedirect(router, loginUrl, redirectUrl));
  }

  logoutAndFlushUser() {
    this.logout().subscribe();
    this.flushUser();
  }

  flushUserAndRedirect(router: Router, loginUrl: string, redirectUrl: string = null) {
    this.flushUser();
    this.redirectUrl = redirectUrl;
    router.navigate([loginUrl]);
  }

  redirectToDashboard(router: Router) {
    const dashboardUrl = this.getDashboardUrl();
    router.navigate([dashboardUrl]);
  }

  flushUser() {
    this.clearAuthStorageItems();
  }

  clearAuthStorageItems() {
    this.clearLoggedInUser();
    CorporateHelper.clearInfo();
    PamHelper.clearInfo();
  }

  isAllowedHotelBooking() {
    return this.isUserLoggedIn() && this.userHasRole(RoleConstant.USER_ROLES);
  }

  isAllowedCorporateBooking() {
    return this.isUserLoggedIn() && this.userHasRole([RoleConstant.CORPORATE_EMPLOYEE]);
  }
}
