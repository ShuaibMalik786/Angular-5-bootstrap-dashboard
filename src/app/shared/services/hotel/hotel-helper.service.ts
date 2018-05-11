import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class HotelHelperService {
  searchDataChanged = new Subject<Params>();

  setSearchData(params: Params) {
    this.searchDataChanged.next(params);
  }
}
