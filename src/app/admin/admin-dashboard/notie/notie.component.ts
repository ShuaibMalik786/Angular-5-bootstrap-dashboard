import { Component, OnInit } from '@angular/core';
import notie from 'notie';

@Component({
  selector: 'app-notie',
  templateUrl: './notie.component.html',
  styleUrls: ['./notie.component.css']
})
export class NotieComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  success() {
    notie.alert({
      type: 1, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Success message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  warning() {
    notie.alert({
      type: 2, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Warning message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  error() {
    notie.alert({
      type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Error message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  info() {
    notie.alert({
      type: 4, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Info message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  neutral() {
    notie.alert({
      type: 5, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Neutral message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  successBottom() {
    notie.alert({
      type: 1, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Success message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  warningBottom() {
    notie.alert({
      type: 2, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Warning message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  errorBottom() {
    notie.alert({
      type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Error message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  infoBottom() {
    notie.alert({
      type: 4, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Info message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }

  neutralBottom() {
    notie.alert({
      type: 5, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Neutral message',
      stay: false, // optional, default = false
      time: 2, // optional, default = 3, minimum = 1,
      position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }
}
