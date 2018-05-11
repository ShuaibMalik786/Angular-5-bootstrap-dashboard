import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuard } from '../../shared/guards/guest-guard.service';

import { DefaultConstant } from '../../shared/constants/default-constant';

import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';

const siteName = DefaultConstant.SITE_NAME;

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [GuestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: `Admin Login | ${siteName}` }
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    GuestGuard
  ]
})
export class AdminRoutingModule {
}
