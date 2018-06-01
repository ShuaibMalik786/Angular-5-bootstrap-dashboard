import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DefaultConstant } from '../../shared/constants/default-constant';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AccountProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './settings/settings.component';
import { NewsHeadlinesComponent } from './news-headlines/news-headlines.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './users/users.component';
import { UsersViewComponent } from './users/user-view/user-view.component';
import { UsersAddComponent } from './users/user-add/user-add.component';
import { UsersEditComponent } from './users/user-edit/user-edit.component';
import { LoginPageComponent } from './pages/login/login.component';
import { IconsComponent } from './icons/icons.component';
import { NotieComponent } from './notie/notie.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { ToastrComponent } from './toastr/toastr.component';

const siteName = DefaultConstant.SITE_NAME;
import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';
import { UiComponentsComponent } from './ui-components/ui-components.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: { title: `Admin Dashboard | ${siteName}` },
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'table-api', component: NewsHeadlinesComponent },
      { path: 'profile', component: AccountProfileComponent },
      { path: 'settings', component: AccountSettingsComponent },
      { path: 'ui-elements', component: UiElementsComponent },
      { path: 'sweet-alert', component: SweetAlertComponent },
      { path: 'ui-components', component: UiComponentsComponent },

      { path: 'pages/login', component: LoginPageComponent },
      { path: 'pages/register', component: RegisterComponent },

      { path: 'icons', component: IconsComponent },
      { path: 'notie', component: NotieComponent },
      { path: 'toastr', component: ToastrComponent },

      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: UsersAddComponent },
      { path: 'users/view', component: UsersViewComponent },
      { path: 'users/edit', component: UsersEditComponent },
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
  providers: []
})
export class AdminDashboardRoutingModule {
}
