import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  currentYear;
  hideFooterInfo = false;

  constructor(private route: ActivatedRoute) {
  }

  pamCities = [
    'Bengaluru', 'Mumbai (Bombay)', 'Pune', 'Navi Mumbai',
    'New Delhi', 'Gurgaon (Gurugram)', 'Greater Noida', 'Chennai(Madras)',
    'Hyderabad', 'Kolkata(Calcatta)', 'Jaipur', 'Vishakapatnam',
    'Surat', 'Indore', 'Nagpur', 'Bhubaneswar',
    'Coimbatore', 'Lucknow', 'Bhopal', 'Kanpur'
  ];

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();
    this.hideFooterInfo = !! this.route.snapshot.data.corporateCore;
  }
}
