import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-login',
  templateUrl: './popup-login.component.html',
})
export class PopupLoginComponent implements OnInit {
  @Input('showRewardMessage') showRewardMessage: boolean = false;
  @Output('onSuccessfulLogin') onSuccessfulLogin = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  successfulLogin() {
    this.onSuccessfulLogin.emit();
  }
}
