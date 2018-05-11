import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import swal from 'sweetalert2';

import { AuthService } from '../../../services/auth/auth.service';
import { NotieService } from '../../../services/notification/notie.service';

import { ApiHelper } from '../../../helpers/api-helper';

@Component({
  selector: 'app-resend-confirmation-email',
  templateUrl: './resend-confirmation-email.component.html'
})
export class ResendConfirmationEmailComponent implements OnInit {
  @Input() email: string;
  @Output() emailSent = new EventEmitter<void>();

  apiCallInFlight = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  resendEmail() {
    if (!this.email) {
      return NotieService.error('Invalid email.');
    }

    if (this.apiCallInFlight) {
      return;
    }

    this.apiCallInFlight = true;

    this.authService.resendConfirmationEmail(this.email)
      .subscribe(
        (response) => {
          if (response.success) {
            swal('Success', 'Successfully resent the confirmation email.', 'success');
            this.emailSent.emit();
          } else {
            NotieService.error('Error encountered while attempting to resend confirmation email.');
          }
          this.apiCallInFlight = false;
        },
        (err) => {
          ApiHelper.displayGenericErrorMessage(err);
          this.apiCallInFlight = false;
        }
      );
  }
}
