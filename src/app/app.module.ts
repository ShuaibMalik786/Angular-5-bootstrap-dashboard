import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { AdminApiService } from './shared/services/api/admin-api.service';
import { ApiService } from './shared/services/api/api.service';
import { AuthService } from './shared/services/auth/auth.service';
import { CacheService } from './shared/services/cache/cache.service';
import { CommonApiService } from './shared/services/api/common-api.service';
import { HotelHelperService } from './shared/services/hotel/hotel-helper.service';
import { InterceptorService } from './shared/services/api/interceptor.service';
import { PamInventoryService } from './shared/services/pam/pam-inventory.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    CacheService,
    CommonApiService,
    HotelHelperService,
    PamInventoryService,
    AuthService,
    AdminApiService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
