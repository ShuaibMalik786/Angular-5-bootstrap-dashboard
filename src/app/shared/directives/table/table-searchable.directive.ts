import {
  AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output, OnChanges
} from '@angular/core';

declare let $: any;

@Directive({
  selector: '[appTableSearchable]'
})
export class TableSearchableDirective implements OnInit, AfterViewInit, OnChanges {
  @Input('appTableSearchable') params: object;
  @Output() onSearchChanged = new EventEmitter<object>();

  searchInput;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.params['search']) {
      this.el.nativeElement.querySelector('input[data-search]').value = this.params['search'];
    } else {
      this.el.nativeElement.querySelector('input[data-search]').value = '';
    }
  }

  ngAfterViewInit() {
    this.searchInput = this.el.nativeElement
      .querySelector('input[data-search]');

    this.searchInput
      .addEventListener('change', this.onChange.bind(this));

    this.el.nativeElement.querySelector('button[data-search]')
      .addEventListener('click', this.onClick.bind(this));

    this.el.nativeElement.querySelector('.form-control-clear')
      .addEventListener('click', this.onClear.bind(this));

    this.initializeSearch();
  }

  private onClick() {
    this.updateSearch();
  }

  private onChange(event) {
    const element = $(this.el.nativeElement).find('.form-group');

    if (event.target.value) {
      element.removeClass('has-empty-value');
    } else {
      element.addClass('has-empty-value');
    }
  }

  private onClear(event) {
    this.updateSearch(true);
  }

  private updateSearch(clear = false) {
    const searchKey = this.searchInput.dataset.search || 'search';

    if (clear) {
      this.searchInput.value = '';
      $(this.el.nativeElement).find('.form-group').addClass('has-empty-value');
    }

    if (!this.searchInput.value && !this.params[searchKey]) {
      return;
    }

    if (this.searchInput.value) {
      this.params[searchKey] = this.searchInput.value;
    } else {
      delete this.params[searchKey];
    }

    // Reset the pagination on search
    delete this.params['page'];

    this.onSearchChanged.emit(this.params);
  }

  initializeSearch() {
    if (this.params[this.searchInput.dataset.search || 'search']) {
      this.searchInput.value = this.params[this.searchInput.dataset.search || 'search'];
    }
  }
}
