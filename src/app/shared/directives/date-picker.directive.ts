import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import * as moment from 'moment';

declare let $: any;

@Directive({
  selector: '[appDatePicker]'
})
export class DatePickerDirective implements OnInit, OnDestroy {
  @Input('appDatePicker') options: object = {};
  @Input() date: any;

  private $el: any;

  private defaultOptions: object = {
    autoclose: true,
    clearBtn: true,
    todayHighlight: true,
    weekStart: 1,
    zIndexOffset: 10000,
    orientation: 'auto bottom',
  };

  private defaultFormat = 'DD/MM/YYYY';

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  ngOnInit() {
    // [WIP] custom formatting of dates.
    // const displayFormat = this.options['displayFormat'];
    //
    // if (displayFormat) {
    //   this.options['format'] = {
    //     toDisplay: function (date, format, language) {
    //       return moment(date)
    //         .format(displayFormat || this.defaultFormat)
    //         .toString();
    //     },
    //
    //     toValue: function (date, format, language) {
    //       console.log('toValue', date);
    //       console.log(moment(date, displayFormat || this.defaultFormat)
    //         .toDate(), new Date());
    //       return moment(date, displayFormat || this.defaultFormat)
    //         .toDate();
    //     },
    //   };
    // }

    this.$el.datepicker(Object.assign(this.defaultOptions, this.options));

    if (this.date) {
      this.$el.datepicker('update', this.date);
    }

    this.$el.on('changeDate', (event) => {
      const inputEvent = new Event('input', { bubbles: true });
      this.el.nativeElement.dispatchEvent(inputEvent);
    });
  }

  ngOnDestroy() {
    this.$el.datepicker('destroy');
  }
}
