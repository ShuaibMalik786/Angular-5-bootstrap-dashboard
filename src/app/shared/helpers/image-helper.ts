import { ElementRef } from '@angular/core';

declare let $: any;

export class ImageHelper {

  static magnificPopup(selector: ElementRef | string, options?: object) {
    options = Object.assign({
      type: 'image',
      mainClass: 'mfp-fade',
      removalDelay: 250,
    }, options);

    $(selector).magnificPopup(options);
  }
}
