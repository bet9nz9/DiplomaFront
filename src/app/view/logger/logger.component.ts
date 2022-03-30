import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Entrance} from '../../model/entrance';
import {PageEvent} from '@angular/material/paginator';
import {Logger} from '../../model/logger';
import {LoggerService} from "../../controller/logger.service";
import {DatePipe} from "@angular/common";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-entrance-log',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent implements OnInit {

  constructor(public httpService: LoggerService,
              private datePipe: DatePipe,
              public dialog: MatDialog) {}

  displayedColumns: string[] = ['user','eKey', 'entrance', 'date', 'time'];
  loggers: Logger[] = [];
  entrance: Entrance[] = [];
  searchParameter = '';
  searchField = '';
  // Колесо загрузки
  flexWheel: boolean;
  totalElements: number;
  currPage = 0;
  currSize = 5;
  // entrance.component.html кнопка с style="visibility = hidden" меняется название кнопки
  actions: string[] = ['Вывести всё', 'Вернуть'];
  findFor = '';
  exportedLog: Logger[];
  params: HttpParams;

  ngOnInit(): void{
    this.getData();
  }

  downloadPDF(): void {
    this.httpService.downloadPDF(this.loggers);
  }

  getData(): void {
    let search = null;
    this.params = new HttpParams().append('page', this.currPage.toString())
      .append('size', this.currSize.toString());
    if (this.searchParameter !== '') {
      if (this.searchField === 'dateFrom' || this.searchField === 'dateTo') {
        let date = new Date(this.searchParameter);
        this.params = this.params.append(this.searchField, date.getTime().toString());
        search = this.searchField + '=' + date.getTime();
      } else {
        this.params = this.params.append(this.searchField, this.searchParameter);
        search = this.searchField + "=" + this.searchParameter;
      }
    }
      this.flexWheel = true;
      this.httpService.getData(this.params).subscribe(
        (response) => {
          // @ts-ignore
          this.loggers = this.parseDate(response.content);
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

  parseDate(loggers: Logger[]): Logger[] {
    //tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < loggers.length; i++) {
      let date = new Date(loggers[i].date);
      // @ts-ignore
      loggers[i].date = this.datePipe.transform(date, 'MMMM d, y');
      // @ts-ignore
      loggers[i].time = this.datePipe.transform(date, 'HH:mm:ss');
    }
    return loggers;
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.getData();
  }

}
