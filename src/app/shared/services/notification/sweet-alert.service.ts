import { Injectable } from '@angular/core';

import swal from 'sweetalert2';

@Injectable()
export class SweetAlertService {

  static success(title , message, callback?) {
    swal({
      title: title,
      text: message,
      type: 'success'
    }).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  // successAndRedirect(message = 'Ok', redirectTo = '/') {
  //   swal({
  //     title: 'Success!',
  //     text: message,
  //     type: 'success',
  //     confirmButtonText: 'OK'
  //   }).then(() => {
  //     this.router.navigate([redirectTo]);
  //   });
  // }
}
