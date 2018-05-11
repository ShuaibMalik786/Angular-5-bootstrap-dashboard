import { Injectable } from '@angular/core';

import { isArray } from 'rxjs/util/isArray';
import * as pluralize from 'pluralize';
import * as _ from 'lodash';

import { PaginationMeta } from '../../models/pagination-meta-model';

@Injectable()
export class PaginationService {
  metaData: PaginationMeta;

  constructor() {
  }

  setMetaData(metaData: PaginationMeta) {
    this.metaData = metaData;
  }

  isEnabled() {
    return !!this.metaData;
  }

  total() {
    return this.metaData.total;
  }

  count() {
    return this.metaData.count;
  }

  perPage() {
    return this.metaData.per_page;
  }

  firstItem() {
    return this.metaData.total > 0 ? (this.currentPage() - 1) * this.perPage() + 1 : 0;
  }

  lastItem() {
    return this.metaData.total > 0 ? this.firstItem() + this.count() - 1 : 0;
  }

  currentPage() {
    return this.metaData.current_page;
  }

  lastPage() {
    return this.metaData.total_pages;
  }

  nextPage() {
    return this.currentPage() + 1;
  }

  previousPage() {
    return this.currentPage() - 1;
  }

  onFirstPage() {
    return this.currentPage() <= 1;
  }

  hasMorePages() {
    return this.currentPage() < this.lastPage();
  }

  hasPages() {
    return this.lastPage() > 1;
  }

  isSeparatorElement(element) {
    return !isArray(element);
  }

  getInfoText() {
    if (this.total()) {
      return `Showing ${this.firstItem()} to ${this.lastItem()} of ${this.total()} ${pluralize('item', this.total())}`;
    }

    return 'No items to show';
  }

  getElements(onEachSide = 2) {
    const elements = this.getSlider(onEachSide);

    return _.compact([
      elements.first,
      isArray(elements.slider) ? '...' : null,
      elements.slider,
      isArray(elements.last) ? '...' : null,
      elements.last,
    ]);
  }

  private getSlider(onEachSide) {
    if (this.lastPage() < (onEachSide * 2) + 4) {
      return this.getSmallSlider();
    }

    return this.getUrlSlider(onEachSide);
  }

  private getSmallSlider() {

    return {
      first: this.getPageRange(1, this.lastPage()),
      slider: null,
      last: null
    };
  }

  private getUrlSlider(onEachSide) {
    const window = onEachSide * 2;

    if (!this.hasPages()) {
      return {
        first: null,
        slider: null,
        last: null
      };
    }

    // If the current page is very close to the beginning of the page range, we will
    // just render the beginning of the page range, followed by the last 2 of the
    // links in this list, since we will not have room to create a full slider.
    if (this.currentPage() <= window) {
      return this.getSliderTooCloseToBeginning(window);
    }

    // If the current page is close to the ending of the page range we will just get
    // this first couple pages, followed by a larger window of these ending pages
    // since we're too close to the end of the list to create a full on slider.
    if (this.currentPage() > (this.lastPage() - window)) {
      return this.getSliderTooCloseToEnding(window);
    }

    // If we have enough room on both sides of the current page to build a slider we
    // will surround it with both the beginning and ending caps, with this window
    // of pages in the middle providing a Google style sliding paginator setup.
    return this.getFullSlider(onEachSide);
  }

  private getSliderTooCloseToBeginning(window) {
    return {
      first: this.getPageRange(1, window + 2),
      slider: null,
      last: this.getFinish()
    };
  }

  private getSliderTooCloseToEnding(window) {
    const last = this.getPageRange(
      this.lastPage() - (window + 2),
      this.lastPage()
    );

    return {
      first: this.getStart(),
      slider: null,
      last: last
    };
  }

  private getFullSlider(onEachSide) {
    return {
      first: this.getStart(),
      slider: this.getAdjacentUrlRange(onEachSide),
      last: this.getFinish()
    };
  }

  private getAdjacentUrlRange(onEachSide) {
    return this.getPageRange(
      this.currentPage() - onEachSide,
      this.currentPage() + onEachSide
    );
  }

  private getStart() {
    return this.getPageRange(1, 2);
  }

  private getFinish() {
    return this.getPageRange(
      this.lastPage() - 1,
      this.lastPage()
    );
  }

  private getPageRange(start: number, end: number) {
    return _.range(start, end + 1);
  }
}
