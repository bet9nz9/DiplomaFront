import {Component, OnInit} from '@angular/core';
import {EKeyService} from '../../controller/eKey.service';
import {MatDialog} from '@angular/material/dialog';
import {Ekey} from '../../model/ekey';
import {EkeyEditComponent} from './ekey-edit/ekey-edit.component';
import {EkeyAddComponent} from './ekey-add/ekey-add.component';
import {PageEvent} from '@angular/material/paginator';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-ekey',
  templateUrl: './ekey.component.html',
  styleUrls: ['./ekey.component.scss']
})
export class EKeyComponent implements OnInit {

  constructor(private httpService: EKeyService, private dialog: MatDialog) {
  }

  displayedColumns: string[];

  isAdmin: boolean;

  ngOnInit(): void {
    this.find();
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    if (this.isAdmin){
      this.displayedColumns = ['name', 'description', 'keyCode', 'active', 'user', 'actions'];
    }else {
      this.displayedColumns = ['name', 'description', 'keyCode', 'active', 'user'];
    }
  }

  findFor = '';
  flexWheel: boolean;
  findName = '';
  currPage = 0;
  currSize = 5;
  eKeys: Ekey[] = [];
  totalElements: number;
  params: HttpParams;


  find(): void {
    this.params = new HttpParams().append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append(this.findFor, this.findName);

    this.flexWheel = true;
    this.httpService.getData(this.params).subscribe(
      (response) =>
      {
        // @ts-ignore
        this.eKeys = response.content;
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );

    // if (this.findName === '') {
    //   this.flexWheel = true;
    //   this.httpService.getData(this.currPage, this.currSize).subscribe(
    //     (response) => {
    //       // @ts-ignore
    //       this.eKeys = response.content;
    //       // @ts-ignore
    //       // tslint:disable-next-line:radix
    //       this.totalElements = parseInt(response.totalElements);
    //       this.flexWheel = false;
    //     },
    //     (error) => {
    //       console.log('error occupied : ' + error);
    //     }
    //   );
    // } else {
    //   this.flexWheel = true;
    //   this.httpService.findWithParam(this.findFor, this.findName, this.currSize, this.currPage).subscribe(
    //     (response) => {
    //       // @ts-ignore
    //       this.eKeys = response.content;
    //       // @ts-ignore
    //       // tslint:disable-next-line:radix
    //       this.totalElements = parseInt(response.totalElements);
    //       this.flexWheel = false;
    //     },
    //     (error) => {
    //       console.log('error occupied : ' + error);
    //     }
    //   );
    // }
  }

  openEditDialog(entrance: Ekey): void {
    const dialogRef = this.dialog.open(EkeyEditComponent, {
      data: entrance,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.find();
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EkeyAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.find();
      }
    });
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.find();
  }

}
