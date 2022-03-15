import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntranceComponent} from './view/entrance/entrance.component';
import {NotificationsComponent} from './view/notifications/notifications.component';
import {UtilitiesComponent} from './view/utilities/utilities.component';
import {UsersComponent} from './view/users/users.component';
import {ActivationCodeComponent, EKeyComponent, ErrorPageComponent, UserProfileComponent} from './view/views';
import {AddressComponent} from './view/address/address.component';
import {HomePageComponent} from './view/home-page/home-page.component';
import {LoggerComponent} from './view/logger/logger.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'entrances', component: EntranceComponent},
  {path: 'activate/:code', component: ActivationCodeComponent},
  {path: 'eKey', component: EKeyComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'log', component: LoggerComponent},
  {path: 'entrance/export', component: EntranceComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'entrances', component: EntranceComponent},
  {path: 'users', component: UsersComponent},
  {path: 'userProfile/:userId', component: UserProfileComponent},
  {path: 'utilities/:addressId', component: UtilitiesComponent},
  {path: 'address/:buildingId', component: AddressComponent},
  {path: 'utilities', component: UtilitiesComponent},
  {path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
