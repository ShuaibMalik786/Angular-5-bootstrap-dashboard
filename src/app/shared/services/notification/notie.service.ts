import { Injectable } from '@angular/core';

import { alert } from 'notie';

@Injectable()
export class NotieService {

  static notify(type, msg, stay = false, time = 3, position = 'top') {
    alert({ type: type, text: msg, stay: stay, time: time, position: position });
  }

  static info(msg, stay = false, time = 3) {
    NotieService.notify('info', msg, stay, time);
  }

  static success(msg, stay = false, time = 3) {
    NotieService.notify('success', msg, stay, time);
  }

  static warning(msg, stay = false, time = 3) {
    NotieService.notify('warning', msg, stay, time);
  }

  static error(msg, stay = false, time = 3) {
    NotieService.notify('error', msg, stay, time);
  }
}
