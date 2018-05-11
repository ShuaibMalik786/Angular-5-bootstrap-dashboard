import {
  AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTableSortable]'
})
export class TableSortableDirective implements OnInit, AfterViewInit {
  @Input('appTableSortable') params: object;
  @Output() onSortChanged = new EventEmitter<object>();
  private sortOrder = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const sortableColumns = this.el.nativeElement.querySelectorAll('th[data-sort]');
    Array.from(sortableColumns).forEach((column: any) => {
      this.renderer.addClass(column, 'table-sorting');
      column.addEventListener('click', this.onClick.bind(this));
    });
  }

  onClick(event) {
    const currentSort = this.params['sort'];
    if (currentSort) {
      this.sortOrder = currentSort.split(',');
    }

    const sortColumn = event.target.dataset.sort;
    if (!sortColumn) {
      return;
    }

    if (event.target.classList.contains('table-sorting')) {
      if (this.sortOrder.indexOf(sortColumn) === -1) {
        this.sortOrder.push(sortColumn);
      }
      event.target.classList.replace('table-sorting', 'table-sorting_asc');
    } else if (event.target.classList.contains('table-sorting_asc')) {
      this.sortOrder[this.sortOrder.indexOf(sortColumn)] = '-' + sortColumn;
      event.target.classList.replace('table-sorting_asc', 'table-sorting_desc');
    } else if (event.target.classList.contains('table-sorting_desc')) {
      this.sortOrder.splice(this.sortOrder.indexOf('-' + sortColumn), 1);
      event.target.classList.replace('table-sorting_desc', 'table-sorting');
    }

    if (this.sortOrder.length > 0) {
      this.params['sort'] = this.sortOrder.join(',');
    } else {
      delete this.params['sort'];
    }

    this.onSortChanged.emit(this.params);
  }
}
