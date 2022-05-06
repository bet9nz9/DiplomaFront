import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Entrance} from '../../model/entrance';
import {PageEvent} from '@angular/material/paginator';
import {Logger} from '../../model/logger';
import {LoggerService} from "../../controller/logger.service";
import {DatePipe} from "@angular/common";
import {HttpParams} from "@angular/common/http";
import {Ekey} from "../../model/ekey";
import {EntranceService} from "../../controller/entance.service";
import {EKeyService} from "../../controller/eKey.service";


@Component({
  selector: 'app-entrance-log',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  constructor(private loggerService: LoggerService,
              private entranceService: EntranceService,
              private ekeyService: EKeyService,
              private datePipe: DatePipe,
              public dialog: MatDialog) {}

  displayedColumns: string[] = ['user','eKey', 'entrance', 'date', 'message'];
  loggers: Logger[] = [];
  entrances: Entrance[];
  ekeys: Ekey[];

  searchParameter = '';
  searchField = '';

  // Колесо загрузки
  flexWheel: boolean;
  totalElements: number;
  currPage = 0;
  currSize = 5;

  exportedLog: Logger[];
  params: HttpParams;

  ngOnInit(): void{
    this.params = new HttpParams();
    this.getData();
    this.getDataForSearchFields();
  }

  getDataForSearchFields(): void{
    let params = new HttpParams();
    this.entranceService.getData(params).subscribe((resp) =>{
      //@ts-ignore
      this.entrances = resp.content;
      this.ekeyService.getData(params).subscribe((responce) => {
        //@ts-ignore
        this.ekeys = responce.content;
      })
    });

  }

  downloadPDF(): void {
    this.loggerService.downloadPDF(this.params);
  }

  getData(): void {
    this.params = this.params.append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append('sort', 'dateAndTime:DESC');

    this.loggerService.getData(this.params).subscribe((responce) => {
      //@ts-ignore
      this.loggers = this.parseDate(responce.content);
      console.log(this.loggers)
    })
  }

  search(): void{
    this.params = new HttpParams();
    if (this.searchParameter == 'dateTo' || this.searchParameter == 'dateFrom'){
      let date = new Date(this.searchField);
      this.params = this.params.append(this.searchParameter, date.getTime().toString());
    } else {
      this.params = this.params.append(this.searchParameter, this.searchField);
    }
    this.getData();
  }

  parseDate(loggers: Logger[]): Logger[] {
    //tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < loggers.length; i++) {
      let date = new Date(loggers[i].dateAndTime);
      // @ts-ignore
      loggers[i].dateAndTime = this.datePipe.transform(date, 'MMMM d yyyy, HH:mm:ss');
      // @ts-ignore
      //loggers[i].time = this.datePipe.transform(date, 'HH:mm:ss');
    }
    return loggers;
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.getData();
  }

}
