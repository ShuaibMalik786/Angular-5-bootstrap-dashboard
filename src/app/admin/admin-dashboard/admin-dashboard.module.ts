import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgSelect2Module } from 'ng-select2';

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
import {IconsComponent} from './icons/icons.component';
import { NotieComponent } from './notie/notie.component';

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
    NotieComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NguiAutoCompleteModule,
    NgSelect2Module
  ]
})
export class AdminDashboardModule {
}