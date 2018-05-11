import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth/auth.service';
import { User } from '../../../../shared/models/user-model';
import { RoleConstant } from '../../../../shared/constants/role-constant';

@Component({
  selector: 'app-admin-dashboard-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() user: User;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

}
