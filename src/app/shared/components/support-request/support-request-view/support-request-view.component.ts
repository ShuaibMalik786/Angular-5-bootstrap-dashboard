import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ImageHelper } from '../../../helpers/image-helper';
import { AuthService } from '../../../services/auth/auth.service';
import { RoleConstant } from '../../../constants/role-constant';

@Component({
  selector: 'app-support-request-view',
  templateUrl: './support-request-view.component.html',
})
export class SupportRequestViewComponent implements OnInit, AfterViewInit {
  request: any;
  roleConstant = RoleConstant;
  @ViewChild('image') image: ElementRef;

  constructor(public authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.request = this.route.snapshot.data.request;
  }

  ngAfterViewInit() {
    if (this.image) {
      ImageHelper.magnificPopup(this.image.nativeElement);
    }
  }
}
