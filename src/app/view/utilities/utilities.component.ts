import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UtilitiesService} from '../../controller/utilities.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Utility} from '../../model/utility';
import {DatePipe} from '@angular/common';
import {UtilitiesTableComponent} from './utilities-table/utilities-table.component';
import {UtilityEditComponentWithoutReading} from "./utilities-table-without-readings/utilities-table-without-readings.component";
import {UtilitiesInfoBoxComponent} from "./utilities-info-box/utilities-info-box.component";
import {ActivatedRoute} from "@angular/router";
import {UtilitiesAddComponent} from "./utilities-add/utilities-add.component";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public httpServer: UtilitiesService,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(UtilitiesTableComponent) utilitiesTable: UtilitiesTableComponent;
  @ViewChild(UtilityEditComponentWithoutReading) utilitiesTableWithoutReading: UtilityEditComponentWithoutReading;
  @ViewChild(UtilitiesInfoBoxComponent) infoBox: UtilitiesInfoBoxComponent;

  utilities: Utility[] = [];
  searchParameter = '';
  serviceId = 0;
  flexWheel: boolean;
  totalElements: number;
  currPage = 0;
  currSize = 5;

  isAdmin: boolean;

  addressId: number;

  searchField = '';
  params: HttpParams;

  date: Date;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'admin';
    this.getData();
  }

  getData(): void {
    this.params = this.params.append('page', this.currPage.toString())
      .append('size', this.currSize.toString());
    this.addressId = +this.activatedRoute.snapshot.paramMap.get('addressId');
    //let search = null;
    if (this.searchParameter !== '') {
      if (this.searchField === 'dateFrom' || this.searchField === 'dateTo') {
        let date = new Date(this.searchParameter);
        this.params = this.params.append(this.searchField, new Date(date.getFullYear(), date.getMonth(), 1).getTime().toString());
        //search = this.searchField + '=' + new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      } else {
        this.params = this.params.append(this.searchField, this.searchParameter);
        //search = this.searchField + "=" + this.searchParameter;
      }
    } else if (!isNaN(this.addressId)) {
      this.params = this.params.append('address', this.addressId.toString());
      //search = 'address==' + this.addressId;
    }
    this.flexWheel = true;
    this.httpServer.getData(this.params).subscribe(
      (response) => {
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

  parseDate(utilities: Utility[]): Utility[] {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < utilities.length; i++) {
      utilities[i].date = new Date(utilities[i].date);
      // @ts-ignore
      utilities[i].date = this.datePipe.transform(utilities[i].date, 'MMM y');
    }
    return utilities;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(UtilitiesAddComponent, {data: this.addressId});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.getData();
  }

  onLastClick(): void {
    this.utilities = null;
    this.serviceId = 0;
    this.getData();
  }

  onElectricityClick(): void {
    this.utilities = null;
    this.serviceId = 161;
    this.getData();
  }

  onWaterClick(): void {
    this.utilities = null;
    this.serviceId = 162;
    this.getData();
  }

  onGasClick(): void {
    this.utilities = null;
    this.serviceId = 163;
    this.getData();
  }

  onOSMDClick(): void {
    this.utilities = null;
    this.serviceId = 164;
    this.getData();
  }

  onInternetClick(): void {
    this.utilities = null;
    this.serviceId = 165;
    this.getData();
  }
}
