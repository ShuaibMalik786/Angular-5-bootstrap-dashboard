import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth/auth.service';
import { User } from '../../../../shared/models/user-model';

@Component({
  selector: 'app-admin-dashboard-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Input() user: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Workaround: Navigation tree view doesn't work on guards.
    const trees: any = $('[data-widget="tree"]');
    trees.tree();
  }
}
