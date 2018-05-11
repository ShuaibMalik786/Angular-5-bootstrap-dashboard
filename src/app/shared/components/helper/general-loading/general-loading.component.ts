import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './general-loading.component.html'
})
export class GeneralLoadingComponent {
  @Input() padding = 50;
}
