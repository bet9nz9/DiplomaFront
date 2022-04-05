import {Component, OnInit} from '@angular/core';
import {Entrance} from '../../model/entrance';
import {EntranceService} from '../../controller/entance.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {AddDialogComponent} from './add-dialog/add-dialog.component';
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-parking',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss'],
})
export class EntranceComponent implements OnInit {

  constructor(private httpService: EntranceService, private dialog: MatDialog){}

  displayedColumns: string[];
  entrances: Entrance[] = [];
  findName = '';
  // Колесо загрузки
  flexWheel: boolean;
  totalElements: number;
  currPage = 0;
  currSize = 5;
  // entrance.component.html кнопка с style="visibility = hidden" меняется название кнопки
  findFor = '';
  isGuard: boolean;
  isAdmin: boolean;
  params: HttpParams;
  hideSearchField: boolean;

  ngOnInit(): void{
    this.hideSearchField = false;
    this.find();
    this.isGuard = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'guard';
    this.isAdmin = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'admin';
    if (this.isGuard || this.isAdmin){
      this.displayedColumns = ['name', 'description', 'type', 'building', 'status', 'active', 'actions'];
    }else{
      this.displayedColumns = ['name', 'description', 'type', 'building', 'status', 'active'];
    }
  }

  openEditDialog(entrance: Entrance): void{
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: entrance,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != ''){
        this.find();
      }
    });
  }

  openAddDialog(): void{
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  find(): void {
    this.params = new HttpParams().append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append(this.findFor, this.findName);

    this.httpService.getData(this.params).subscribe(
      (response) =>
      {
        // @ts-ignore
        this.entrances = response.content;
        // @ts-ignore
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );
  }

  setStatus(entrance: Entrance): void {
    let statusEntrance = new Entrance(entrance);
    this.flexWheel = true;
    statusEntrance.status = !entrance.status;
    this.httpService.updateEntrance(statusEntrance).subscribe( data => {
        this.flexWheel = false;
        entrance.status = statusEntrance.status;
    }, (error) =>
      {
        console.log('error occupied : ' + error);
      }
    )
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.find();
  }

  hideField(): void {
    if (this.findFor == "isActive" || this.findFor == "status"){
      this.hideSearchField = true;
    } else {
      this.hideSearchField = false;
      this.findName = '';
    }
  }

}
