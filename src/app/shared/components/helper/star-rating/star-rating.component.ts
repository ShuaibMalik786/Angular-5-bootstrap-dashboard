import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html'
})
export class StarRatingComponent {
  @Input() rating = 5;

  getRating() {
    if (!this.rating || +this.rating === 0) {
      return [];
    }

    return _.range(1, Math.max(Math.min(this.rating, 5), 1) + 1);
  }
}
