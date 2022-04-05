import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthDialogComponent} from './auth-dialog/auth-dialog.component';
import {BuildingService} from "../../controller/building.service";
import {Building} from "../../model/building";
import {AuthService} from "../../controller/auth.service";
import {User} from '../../model/user';
import {Address} from "../../model/address";
import {AddressService} from "../../controller/address.service";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public httpService: BuildingService,
              public addressesService: AddressService,
              public router: Router,
              public authService: AuthService) {
  }

  buildings: Building[];
  isAuthority: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isNoGuest: boolean;
  currentUser = new User(null);
  userAddresses: Address[];
  noAddresses: boolean;
  addressIsReady: boolean = true;
  params: HttpParams;

  ngOnInit(): void {
    this.isAuthority = localStorage.getItem('Authorization') !== null;
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.isUser = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'user';
    this.isNoGuest = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') !== 'guest';
    if (this.isAuthority) {
      this.getCurrentUser();
    }
  }

  openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
      }
    });
  }

  getBuildings(): void {
    this.httpService.getAll().subscribe(
      (response) => {
        //@ts-ignore
        this.buildings = response.content;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  getUserAddresses(): void{
    this.params = new HttpParams().append('referencedUser', this.currentUser.id.toString());

    this.addressesService.getAddressesByUser(this.params).subscribe((response) => {
      // @ts-ignore
      this.userAddresses = response.content;
      this.addressIsReady = false;
      if (this.userAddresses.length === 0) {
        this.noAddresses = true;
      } else {
        this.noAddresses = false;
      }
    })
  }

  redirect(): void {
    this.router.navigate(['./']);
    setTimeout(() => location.reload(), 500);
  }

  getCurrentUser(): void {
    if (this.currentUser.id === undefined) {
      this.authService.current().subscribe((response) => {
        this.currentUser = response;
        if (this.isAdmin) {
          this.getBuildings();
        }
        if (this.isNoGuest) {
          this.getUserAddresses();
        }
      });
    }
  }
}

