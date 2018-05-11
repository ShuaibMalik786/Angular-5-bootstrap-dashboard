import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { PaginationMeta } from '../../../shared/models/pagination-meta-model';
import { AdminApiService } from '../../../shared/services/api/admin-api.service';
import { ApiHelper } from '../../../shared/helpers/api-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './news-headlines.component.html'
})
export class NewsHeadlinesComponent implements OnInit {
  topHeadlines;
  loading: boolean;
  paginationMeta: PaginationMeta;
  httpParams: object = {
    apiKey: '0d242696694c489ebccfad34c50c5f4d',
    country: 'us'
  };

  constructor(private adminApiService: AdminApiService,
    private router: Router) {
  }

  ngOnInit() {
    this.LoadPayments();
  }


  onUpdateParams(params: object) {
    this.httpParams = params;
    if (!this.httpParams['country']) {
      this.httpParams['country'] = 'us';
    }

    this.LoadPayments();
  }


  LoadPayments() {
    this.loading = true;
    this.adminApiService.getNews(this.httpParams)
      .subscribe(
        (response) => {
          this.topHeadlines = response.articles;
          this.loading = false;
        },
        (err) => {
          ApiHelper.displayGenericErrorMessage(err);
          this.loading = false;
        }
      );
  }

}
