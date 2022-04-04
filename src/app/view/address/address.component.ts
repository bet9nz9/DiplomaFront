import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddressService} from '../../controller/address.service';
import {Address} from '../../model/address';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AddressEditComponent} from './address-edit/address-edit.component';
import {AddressAddComponent} from './address-add/address-add.component';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public httpServer: AddressService,
              public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['flat'
    , 'building_name', 'apartmentNumber', 'userName', 'actions', 'action'];

  searchParameter = '';
  searchField = '';

  isAdmin: boolean;
  params: HttpParams;
  buildingId: number;
  addresses: Address[];
  flexWheel: boolean;
  totalElements: number;
  currPage = 0;
  currSize = 5;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.buildingId = +this.activatedRoute.snapshot.paramMap.get('buildingId');
    this.getData();
  }

  getData(): void {
    this.params = new HttpParams().append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append('buildingId', this.buildingId.toString());
    this.flexWheel = true;
    this.httpServer.getAddressesByBuildingId(this.params).subscribe(
      (response) => {
        // @ts-ignore
        debugger
        this.addresses = response.content;
        // @ts-ignore
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  search(): void {
    this.params = new HttpParams().append(this.searchField, this.searchParameter)
      .append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append('buildingId', this.buildingId.toString());

    //TODO: DELETE
    // let searchString;
    // if (this.searchField === '') {
    //   searchString = null;
    // } else if (this.searchParameter === '') {
    //   searchString = null;
    // } else {
    //   if (this.searchField === 'flat' || this.searchField === 'apartmentNumber') {
    //     searchString = '&' + this.searchField + '==' + this.searchParameter;
    //   } else {
    //     searchString = '&' + this.searchField + '=' + this.searchParameter;
    //   }
    // }

    this.httpServer.search(this.params).subscribe(
      (response) => {
        // @ts-ignore
        this.addresses = response.content;
        debugger
        // @ts-ignore
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddressAddComponent, {data: this.buildingId});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.getData();
  }

  openEditDialog(address: Address): void {
    const dialogRef = this.dialog.open(AddressEditComponent, {
      data: address
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

