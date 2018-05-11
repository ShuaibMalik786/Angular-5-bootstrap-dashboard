import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PamInventoryService {
  errorsUpdated = new Subject<any>();
  apiCallCompleted = new Subject<void>();

  constructor() {
  }
}
