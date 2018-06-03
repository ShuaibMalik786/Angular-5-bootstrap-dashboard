import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-ui-components',
  templateUrl: './ui-components.component.html',
})
export class UiComponentsComponent implements OnInit {
  rating = 1;
  date = new Date();
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    barTitleIfEmpty: 'Click to select a date'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
