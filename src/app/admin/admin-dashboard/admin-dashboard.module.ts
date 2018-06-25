import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgSelect2Module } from 'ng-select2';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AdminDashboardBaseComponent } from './base/admin-dashboard-base';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AccountProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './settings/settings.component';
import { NewsHeadlinesComponent } from './news-headlines/news-headlines.component';
import { UsersAddComponent } from './users/user-add/user-add.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/user-edit/user-edit.component';
import { UsersViewComponent } from './users/user-view/user-view.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginPageComponent } from './pages/login/login.component';
import { IconsComponent } from './icons/icons.component';
import { NotieComponent } from './notie/notie.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';
import { ToastrComponent } from './toastr/toastr.component';
import { UiComponentsComponent } from './ui-components/ui-components.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AdminDashboardBaseComponent,
    AdminDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardHomeComponent,
    AccountProfileComponent,
    AccountSettingsComponent,
    NewsHeadlinesComponent,
    UsersAddComponent,
    UsersComponent,
    UsersEditComponent,
    UsersViewComponent,
    RegisterComponent,
    LoginPageComponent,
    IconsComponent,
    NotieComponent,
    UiElementsComponent,
    SweetAlertComponent,
    ToastrComponent,
    UiComponentsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    ToastModule.forRoot()
  ]
})
export class AdminDashboardModule {
}
