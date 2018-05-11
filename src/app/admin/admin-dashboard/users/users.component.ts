import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../../shared/services/api/admin-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {

  constructor(private adminApiService: AdminApiService) {
  }

  ngOnInit() {
  }

}
