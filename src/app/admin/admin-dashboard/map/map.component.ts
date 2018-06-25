import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit {


  constructor() {
  }

  ngOnInit() {
    const mapOptions = {
      center: new google.maps.LatLng(12.9716, 77.5946),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  ngAfterViewInit() {

  }

}
