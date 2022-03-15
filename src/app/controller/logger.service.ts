import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logger } from '../model/logger';
import {PortService} from "./port.service";

@Injectable({
  providedIn: 'any'
})
export class LoggerService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:'+this.port+'/logger';

  downloadPDF(body: Logger[]): void {
    console.log('http://localhost:'+this.port+'/entrance/export');
    this.http.get('http://localhost:'+this.port+'/entrance/export',{
      responseType: 'arraybuffer', headers:this.httpHeaders}).subscribe(response => this.downLoadFile(response,"application/pdf"));
  }

  downLoadFile(data: any, type: string){
    let blob = new Blob([data],{type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if(!pwa || pwa.closed || typeof pwa.closed == 'undefined'){
      alert('Please disable your Pop-up blocker and try again');
    }
  }

  addLogger(body: Logger): void {
    this.http.post<Logger>(this.url + '/add', body, {headers: this.httpHeaders}).subscribe(data => {
      console.log(data);
    });
  }

  updateLogger(body: Logger): void {
    this.http.put<Logger>(this.url, body, {headers: this.httpHeaders}).subscribe(data => {
      console.log(data);
    });
  }

  getData(pageNumber: number, size: number,searchParameter: string): Observable<Logger> {
    if (pageNumber === 0 && size === 0) {
      return this.http.get<Logger>(this.url);
    }
    if (searchParameter != ''){
      return this.http.get<Logger>(this.url + '?' + searchParameter, {headers: this.httpHeaders});
    }
    if (searchParameter !== ''){
      return this.http.get<Logger>(this.url + '?page=' + pageNumber + '&size=' + size + '&' + searchParameter, {headers: this.httpHeaders});
    }
    return this.http.get<Logger>(this.url + '?page=' + pageNumber + '&size=' + size, {headers: this.httpHeaders});
  }

  getOneLogger(id: number): Observable<Logger> {
    return this.http.get<Logger>(this.url + '/get-one/' + id, {headers: this.httpHeaders});
  }
}


