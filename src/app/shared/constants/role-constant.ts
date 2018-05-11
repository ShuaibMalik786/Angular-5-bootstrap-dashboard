export class RoleConstant {
  // Roles
  static USER                  = 'user';
  static PAM_MASTER            = 'pam-master';
  static PAM_SURVEYOR          = 'pam-surveyor';
  static PAM_LOADING_MANAGER   = 'pam-loading-manager';
  static PAM_UNLOADING_MANAGER = 'pam-unloading-manager';
  static CORPORATE_MASTER      = 'corporate-master';
  static CORPORATE_POC         = 'corporate-poc';
  static CORPORATE_BRANCH_POC  = 'corporate-branch-poc';
  static CORPORATE_EMPLOYEE    = 'corporate-employee';
  static SUPER_ADMIN           = 'super-admin';
  static PAM_ADMIN             = 'pam-admin';
  static CUSTOMER_SUPPORT      = 'customer-support';

  // Redirects
  static USER_LOGIN_URL       = '/login';
  static PAM_LOGIN_URL        = '/packers-and-movers-vendor/login';
  static CORPORATE_LOGIN_URL  = '/corporates/login';
  static ADMIN_LOGIN_URL      = '/admin/login';

  static USER_DASHBOARD_URL      = '/user';
  static PAM_DASHBOARD_URL       = '/vendor';
  static CORPORATE_DASHBOARD_URL = '/corporate';
  static ADMIN_DASHBOARD_URL     = '/hl-admin';

  // Role groups
  static USER_ROLES = [
    RoleConstant.USER,
    RoleConstant.CORPORATE_EMPLOYEE
  ];

  static PAM_ROLES = [
    RoleConstant.PAM_MASTER,
    RoleConstant.PAM_SURVEYOR,
    RoleConstant.PAM_LOADING_MANAGER,
    RoleConstant.PAM_UNLOADING_MANAGER,
  ];

  static CORPORATE_ROLES = [
    RoleConstant.CORPORATE_MASTER,
    RoleConstant.CORPORATE_POC,
    RoleConstant.CORPORATE_BRANCH_POC,
  ];

  static ADMIN_ROLES = [
    RoleConstant.SUPER_ADMIN,
    RoleConstant.PAM_ADMIN,
    RoleConstant.CUSTOMER_SUPPORT
  ];

  static USERNAME_BASED_ROLES = [
    RoleConstant.PAM_SURVEYOR,
    RoleConstant.PAM_LOADING_MANAGER,
    RoleConstant.PAM_UNLOADING_MANAGER,
  ];
}
