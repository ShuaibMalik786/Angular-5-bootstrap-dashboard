import {
  AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output, OnChanges
} from '@angular/core';

import * as _ from 'lodash';

@Directive({
  selector: '[appTableFilterable]'
})
export class TableFilterableDirective implements OnInit, AfterViewInit, OnChanges {
  @Input('appTableFilterable') params: object;
  @Output() onFilterChanged = new EventEmitter<object>();

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const filterButtons = this.el.nativeElement.querySelectorAll('button[data-filter]');
    Array.from(filterButtons).forEach((button: any) => {
      button.addEventListener('click', this.onClick.bind(this));
    });
    this.initializeFilter();
  }

  ngOnChanges() {
    this.initializeFilter();
  }

  onClick(event) {
    const action = event.target.dataset.filter;
    // const originalParams = Object.assign({}, this.params);

    if (action === 'apply-filters') {
      this.applyFilters();
    } else if (action === 'clear-filters') {
      this.clearFilters();
    } else {
      return;
    }

    // Enable this if the api should be called only when the filters are actually changed.
    // if (!_.isEqual(originalParams, this.params)) {
    //   this.onFilterChanged.emit(this.params);
    // }

    // Reset the pagination on filter change
    delete this.params['page'];

    this.onFilterChanged.emit(this.params);
  }

  private applyFilters() {
    const filters = this.getFilters();

    Array.from(filters).forEach((element: any) => {
      if (element.value !== null
        && element.value !== 'null'
        && element.value !== ''
        && element.value !== undefined) {
        this.params[element.dataset.filter] = element.value;
      } else {
        delete this.params[element.dataset.filter];
      }
    });
  }

  private clearFilters() {
    const filters = this.getFilters();

    Array.from(filters).forEach((element: any) => {
      delete this.params[element.dataset.filter];
    });

    this.el.nativeElement.reset();
  }

  private getFilters() {
    return this.el.nativeElement.querySelectorAll('[data-filter]:not(button)');
  }

  initializeFilter() {
    const filters = this.getFilters();
    Array.from(filters).forEach((element: any) => {
      if (this.params[element.dataset.filter] !== null
        && this.params[element.dataset.filter] !== 'null'
        && this.params[element.dataset.filter] !== ''
        && this.params[element.dataset.filter] !== undefined
        && this.params[element.dataset.filter] !== 'undefined') {
        element.value = this.params[element.dataset.filter];
      } else {
        element.value = null;
      }
    });
  }
}
