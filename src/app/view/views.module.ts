import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopMenuComponent, EditDialogComponent, AddDialogComponent, AuthDialogComponent} from './views';
import {BotMenuComponent} from './views';
import {EntranceComponent} from './views';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {UsersComponent} from './views';
import {UtilitiesComponent} from './utilities/utilities.component';
import {MatTabsModule} from '@angular/material/tabs';
import {UtilitiesTableComponent} from './utilities/utilities-table/utilities-table.component';
import {UtilityEditComponent} from './utilities/utilities-table/utilities-table.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {UserProfileComponent} from './views';
import {
  UtilitiesTableWithoutReadingsComponent,
  UtilityEditComponentWithoutReading
} from './utilities/utilities-table-without-readings/utilities-table-without-readings.component';
import {AddressComponent} from './address/address.component';
import {AddressEditComponent} from './address/address-edit/address-edit.component';
import {UtilitiesAddComponent} from './utilities/utilities-add/utilities-add.component';
import {AddressAddComponent} from './address/address-add/address-add.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {UtilitiesInfoBoxComponent} from './utilities/utilities-info-box/utilities-info-box.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HomePageComponent} from './home-page/home-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {WaitComponent} from './views';
import {RegistryComponent} from './top-menu/registry/registry.component';
import {EKeyComponent} from './ekey/ekey.component';
import { EkeyAddComponent } from './ekey/ekey-add/ekey-add.component';
import { EkeyEditComponent } from './ekey/ekey-edit/ekey-edit.component';
import {NotActivatedComponent} from './top-menu/auth-dialog/not-activated/not-activated.component';
import { ActivationCodeComponent} from './activation-code/activation-code.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {LoggerComponent} from './logger/logger.component';
import {ViewNoteComponent} from './notifications/view-note/view-note.component';
import {AddDialogNotificationComponent} from './notifications/add-notification/add-dialog-notification.component';
import {AddDialogCategory} from './category/add-category/add-dialog-category.component';
import {PopupComponent} from './top-menu/registry/popup-check/popup.component';
import {DialogCategory} from './category/category.component';
import {UpdateCategory} from './category/update-category/update-category';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxChartComponent } from './home-page/ngx-chart/ngx-chart.component';
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import { SubmitComponent } from './submit/submit.component';

@NgModule({
  declarations: [
    UsersComponent,
    TopMenuComponent,
    EntranceComponent,
    BotMenuComponent,
    EditDialogComponent,
    AddDialogComponent,
    UtilitiesComponent,
    UtilitiesTableComponent,
    DialogCategory,
    UtilityEditComponent,
    HomePageComponent,
    UtilityEditComponentWithoutReading,
    UtilitiesTableWithoutReadingsComponent,
    UtilitiesInfoBoxComponent,
    UtilitiesAddComponent,
    AddressAddComponent,
    AddressComponent,
    UpdateCategory,
    AddDialogCategory,
    AddressEditComponent,
    AuthDialogComponent,
    NotificationsComponent,
    AddDialogNotificationComponent,
    ViewNoteComponent,
    UserProfileComponent,
    WaitComponent,
    EKeyComponent,
    RegistryComponent,
    EkeyAddComponent,
    EkeyEditComponent,
    NotActivatedComponent,
    ActivationCodeComponent,
    LoggerComponent,
    ErrorPageComponent,
    PopupComponent,
    NgxChartComponent,
    SubmitComponent,
    NgxChartComponent,
    ErrorDialogComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    RouterModule,
    MatGridListModule,
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatExpansionModule,
    NgxChartsModule
  ],
  exports: [
    UsersComponent,
    MatIconModule,
    TopMenuComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRippleModule,
    DialogCategory,
    UpdateCategory,
    MatDialogModule,
    MatSnackBarModule,
    MatGridListModule,
    EntranceComponent,
    BotMenuComponent,
    EditDialogComponent,
    AddDialogComponent,
    AddDialogCategory,
    MatProgressSpinnerModule,
    FormsModule,
    HomePageComponent,
    AuthDialogComponent,
    UtilitiesComponent,
    UtilitiesTableComponent,
    UtilityEditComponent,
    UtilityEditComponentWithoutReading,
    UtilitiesTableWithoutReadingsComponent,
    UtilitiesInfoBoxComponent,
    UtilitiesAddComponent,
    AddressEditComponent,
    AddressComponent,
    AddressAddComponent,
    ViewNoteComponent,
    MatSlideToggleModule,
    MatSliderModule,
    AddDialogNotificationComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    LoggerComponent,
    MatNativeDateModule,
    WaitComponent,
    EKeyComponent,
    RegistryComponent,
    EkeyEditComponent,
    EkeyAddComponent,
    NotActivatedComponent,
    ActivationCodeComponent,
    ErrorPageComponent,
    PopupComponent,
    NgxChartsModule,
    NgxChartComponent,
    ErrorDialogComponent,
    SubmitComponent
  ]
})
export class ViewsModule {
}
