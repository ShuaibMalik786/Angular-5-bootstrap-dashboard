import { Injectable } from '@angular/core';

import { Helper } from '../../helpers/helper';

@Injectable()
export class LocalStorageService {

  static set(key: string, item: any) {
    if (item instanceof Object) {
      item = JSON.stringify(item);
    }
    localStorage.setItem(key, item);
  }

  static get(key: string): string | object {
    let item = localStorage.getItem(key);
    if (Helper.isJsonString(item)) {
      item = JSON.parse(item);
    }
    return item;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
