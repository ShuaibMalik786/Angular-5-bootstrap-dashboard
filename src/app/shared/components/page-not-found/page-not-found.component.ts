import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { ScrollHelper } from '../../helpers/scroll-helper';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit, AfterViewChecked {

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    ScrollHelper.scrollToTop();
  }
}
