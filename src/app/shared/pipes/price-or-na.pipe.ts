import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'priceOrNa'
})
export class PriceOrNaPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, args?: any): any {
    return value
      ? this.currencyPipe.transform(value, 'INR', true, '1.2-2')
      : '<span class="label label-default">Not Availed</span>';
  }

}
