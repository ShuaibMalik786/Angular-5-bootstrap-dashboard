import { Injectable } from '@angular/core';

import { Helper } from '../../helpers/helper';

@Injectable()
export class SessionStorageService {

  static set(key: string, item: any) {
    if (item instanceof Object) {
      item = JSON.stringify(item);
    }
    sessionStorage.setItem(key, item);
  }

  static get(key: string): string | object {
    let item = sessionStorage.getItem(key);
    if (Helper.isJsonString(item)) {
      item = JSON.parse(item);
    }
    return item;
  }

  static remove(key: string) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }
}
