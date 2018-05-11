import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { PaginationService } from '../../../services/helper/pagination.service';
import { PaginationMeta } from '../../../models/pagination-meta-model';
import { DefaultConstant } from '../../../constants/default-constant';

declare let $: any;

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  providers: [PaginationService]
})
export class TablePaginationComponent implements OnInit, OnChanges {
  @Input() metaData: PaginationMeta;
  @Input() params: object;
  @Input() simple: boolean = false;
  @Output() onPageChanged = new EventEmitter<object>();

  limit = DefaultConstant.PAGINATION_LIMIT;
  limitValues = [5, 10, 15, 20, 25, 50];

  constructor(public pagination: PaginationService) {
  }

  ngOnInit() {
    this.pagination.setMetaData(this.metaData);

    if (this.params.hasOwnProperty('limit')) {
      this.limit = this.params['limit'];
    } else {
      this.params['limit'] = this.limit;
    }
  }

  ngOnChanges() {
    this.pagination.setMetaData(this.metaData);
    if (this.params.hasOwnProperty('limit')) {
      this.limit = this.params['limit'];
    } else {
      this.params['limit'] = this.limit;
    }
  }

  changePage(page: number) {
    this.params['page'] = page;
    this.onPageChanged.emit(this.params);
  }

  changeLimit() {
    // Reset the pagination on limit change
    delete this.params['page'];

    this.params['limit'] = this.limit;
    this.onPageChanged.emit(this.params);

    $('select').blur();
  }
}
