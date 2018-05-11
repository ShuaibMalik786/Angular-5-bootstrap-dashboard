import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth/auth.service';
import { RoleConstant } from '../../shared/constants/role-constant';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
})
export class EmailConfirmationComponent implements OnInit {
  tokenCheckCompleted = false;
  confirmationSuccess = false;
  loginUrl = RoleConstant.USER_LOGIN_URL;
  errorMessage = 'Invalid request. Please check the link again!';

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');

    if (!token || !email) {
      this.tokenCheckCompleted = true;
      return;
    }

    this.authService.confirmEmail(email, token)
      .subscribe(
        (response) => {
          if (response.success) {
            const roles = response.data;
            if (roles && roles.length > 0) {
              this.loginUrl = this.authService.getLoginUrl(roles[0].slug);
            }
            this.confirmationSuccess = true;
          }
          this.tokenCheckCompleted = true;
        },
        (err) => {
          if (err.status !== 422) {
            this.errorMessage = 'Something went wrong when verifying the email. Please contact an admin for further support.';
          }
          this.tokenCheckCompleted = true;
        }
      );
  }

  redirectToLoginPage() {
    this.router.navigate([this.loginUrl]);
  }
}
