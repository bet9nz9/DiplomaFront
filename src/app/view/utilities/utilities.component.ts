import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UtilitiesService} from '../../controller/utilities.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Utility} from '../../model/utility';
import {DatePipe} from '@angular/common';
import {UtilitiesTableComponent} from './utilities-table/utilities-table.component';
import {UtilityEditComponentWithoutReading} from "./utilities-table-without-readings/utilities-table-without-readings.component";
import {UtilitiesInfoBoxComponent} from "./utilities-info-box/utilities-info-box.component";
import {Router} from "@angular/router";
import {UtilitiesAddComponent} from "./utilities-add/utilities-add.component";
import {HttpParams} from "@angular/common/http";
import {Service} from "../../model/service";
import {ServiceType} from "../../model/serviceType";

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public httpServer: UtilitiesService,
              public utilitiesService: UtilitiesService,
              private datePipe: DatePipe,
              private router: Router) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(UtilitiesTableComponent) utilitiesTable: UtilitiesTableComponent;
  @ViewChild(UtilityEditComponentWithoutReading) utilitiesTableWithoutReading: UtilityEditComponentWithoutReading;
  @ViewChild(UtilitiesInfoBoxComponent) infoBox: UtilitiesInfoBoxComponent;

  utilities: Utility[] = [];
  services: ServiceType[] = [];
  userServices: Service[];
  searchParameter = '';
  userServiceId = null;
  flexWheel: boolean;
  totalElements: number;
  currPage = 0;
  currSize = 5;

  isAdmin: boolean;

  showDatePicker = false;
  showStatuses = false;
  showSearch = true;

  addressId: number;

  searchField = '';
  params: HttpParams;

  date: Date;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.addressId = +this.router.url.split('/').pop();
    this.getServices();
    this.getData();
  }

  getData(): void {
    this.params = new HttpParams().append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append('address', this.addressId == null ? null : this.addressId.toString());

    if (this.userServiceId != null) {
      this.params = this.params.append('service', this.userServiceId.toString());
    }

    debugger;
    if (this.searchParameter != '' && this.searchField != '') {
      if (this.searchParameter == 'dateAndTime') {
        let date = new Date(this.searchField);
        this.params = this.params.append(this.searchParameter, new Date(date.getFullYear(), date.getMonth(), 1).getTime().toString());
      } else {
        this.params = this.params.append(this.searchParameter, this.searchField);
      }
    }

    this.flexWheel = true;
    this.httpServer.getData(this.params).subscribe(
      (response) => {
        this.utilities = null;
        // @ts-ignore
        this.utilities = this.parseDate(response.content);
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  getServices(): void {
    let params = new HttpParams().append('address', this.addressId.toString());

    this.utilitiesService.getServices(params).subscribe(resp => {
      //@ts-ignore
      this.userServices = resp.content;
    });

    this.utilitiesService.getServicesTypes().subscribe(
      (responseServices) => {
        // @ts-ignore
        this.services = responseServices.content;
      }
    );
  }

  parseDate(utilities: Utility[]): Utility[] {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < utilities.length; i++) {
      utilities[i].dateAndTime = new Date(utilities[i].dateAndTime);
      // @ts-ignore
      utilities[i].dateAndTime = this.datePipe.transform(utilities[i].dateAndTime, 'MMM y');
    }
    return utilities;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(UtilitiesAddComponent, {data: this.addressId});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openUserServices(): void {
    const dialogRef = this.dialog.open(UtilitiesInfoBoxComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.getData();
  }

  changeService(serviceName: string): void {
    this.utilities = null;
    this.userServiceId = -1;
    let serviceId: number;

    if (serviceName == "") {
      this.userServiceId = null;
    }

    for (let service of this.services) {
      if (service.name == serviceName) {
        serviceId = service.id;
      }
    }

    for (let userService of this.userServices) {
      if (userService.serviceType.id == serviceId) {
        this.userServiceId = userService.id;
      }
    }
    this.getData();
  }

  hideField(searchParameter: string) {
    this.searchField = '';
    if (searchParameter == 'dateAndTime') {
      this.showDatePicker = true;
      this.showStatuses = false;
      this.showSearch = false;
    } else if (searchParameter == 'status') {
      this.showDatePicker = false;
      this.showStatuses = true;
      this.showSearch = false;
    } else {
      this.showDatePicker = false;
      this.showStatuses = false;
      this.showSearch = true;
    }
  }
}
