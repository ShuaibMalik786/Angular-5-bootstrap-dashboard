import { Component, OnInit } from '@angular/core';

import { CommonApiService } from '../../../services/api/common-api.service';
import { PaginationMeta } from '../../../models/pagination-meta-model';
import { ApiHelper } from '../../../helpers/api-helper';

@Component({
  selector: 'app-support-request-list',
  templateUrl: './support-request-list.component.html',
})
export class SupportRequestListComponent implements OnInit {
  loading = true;
  supportRequests = [];
  paginationMeta: PaginationMeta;
  httpParams: object = { paginate: true };

  constructor(private commonApiService: CommonApiService) {
  }

  ngOnInit() {
    this.getSupportRequests();
  }

  onUpdateParams(params: object) {
    this.httpParams = params;
    this.getSupportRequests();
  }

  private getSupportRequests() {
    this.loading = true;
    this.commonApiService.listSupportRequests(this.httpParams)
      .subscribe(
        (response) => {
          this.supportRequests = response.data;
          this.paginationMeta = response.meta.pagination as PaginationMeta;
          this.loading = false;
        },
        (err) => {
          ApiHelper.displayGenericErrorMessage(err);
          this.loading = false;
        }
      );
  }
}
