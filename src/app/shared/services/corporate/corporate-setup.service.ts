import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CorporateSetupService {
  currentTab: string;
  tabChanged = new Subject<string>();
  shouldUpdateMasterConfig = new Subject<void>();

  constructor() {
  }

  switchTab(tab: string) {
    this.currentTab = tab;
    this.tabChanged.next(tab);
  }
}
