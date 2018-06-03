import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PopupLoginComponent } from './components/auth/popup-login/popup-login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StarRatingComponent } from './components/helper/star-rating/star-rating.component';
import { SupportRequestViewComponent } from './components/support-request/support-request-view/support-request-view.component';
import { SupportRequestCreateComponent } from './components/support-request/support-request-create/support-request-create.component';
import { SupportRequestListComponent } from './components/support-request/support-request-list/support-request-list.component';
import { TableLoadingComponent } from './components/helper/table-loading/table-loading.component';
import { TableNoDataComponent } from './components/helper/table-no-data/table-no-data.component';
import { TablePaginationComponent } from './components/helper/table-pagination/table-pagination.component';
import { GeneralLoadingComponent } from './components/helper/general-loading/general-loading.component';
import { SpinnerComponent } from './components/helper/spinner/spinner.component';
import { ResendConfirmationEmailComponent } from './components/auth/resend-confirmation-email/resend-confirmation-email.component';

import { PamStatusDirective } from './directives/pam-status.directive';
import { DatePickerDirective } from './directives/date-picker.directive';
import { HotelStatusDirective } from './directives/hotel-status.directive';
import { TableSortableDirective } from './directives/table/table-sortable.directive';
import { TableFilterableDirective } from './directives/table/table-filterable.directive';
import { TableSearchableDirective } from './directives/table/table-searchable.directive';
import { EventTrackerDirective } from './directives/google-analytics/event-tracker.directive';

import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { PriceOrNaPipe } from './pipes/price-or-na.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    FooterComponent,
    PopupLoginComponent,
    PageNotFoundComponent,
    StarRatingComponent,
    SupportRequestListComponent,
    SupportRequestCreateComponent,
    SupportRequestViewComponent,
    TableLoadingComponent,
    TableNoDataComponent,
    TablePaginationComponent,
    SpinnerComponent,
    GeneralLoadingComponent,
    ResendConfirmationEmailComponent,
    // Directives
    DatePickerDirective,
    EventTrackerDirective,
    HotelStatusDirective,
    PamStatusDirective,
    TableFilterableDirective,
    TableSearchableDirective,
    TableSortableDirective,
    // Pipes
    NumberToArrayPipe,
    PriceOrNaPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Components
    HeaderComponent,
    FooterComponent,
    PopupLoginComponent,
    PageNotFoundComponent,
    StarRatingComponent,
    SupportRequestListComponent,
    SupportRequestCreateComponent,
    SupportRequestViewComponent,
    TableLoadingComponent,
    TableNoDataComponent,
    TablePaginationComponent,
    SpinnerComponent,
    GeneralLoadingComponent,
    ResendConfirmationEmailComponent,
    // Directives
    DatePickerDirective,
    EventTrackerDirective,
    HotelStatusDirective,
    PamStatusDirective,
    TableFilterableDirective,
    TableSearchableDirective,
    TableSortableDirective,
    // Pipes
    NumberToArrayPipe,
    PriceOrNaPipe,
    SafeHtmlPipe
  ],
  providers: [
    CurrencyPipe
  ]
})
export class SharedModule {
}
