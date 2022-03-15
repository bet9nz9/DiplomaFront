import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notifications } from '../model/notifications';
import {PortService} from './port.service';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'any'
})
export class NotificationService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/notification';

  addNotification(body: Notifications): Observable<any> {
    return this.http.post<Notifications>(this.url + '/add', body, {headers: this.httpHeaders});
  }
  getData(pageNumber: number, size: number, searchParameter: string): Observable<Notifications> {
    if (pageNumber === 0 && size === 0) {
      return this.http.get<Notifications>(this.url, {headers: this.httpHeaders});
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<Notifications>(this.url + '?page=' + pageNumber + '&size=' + size + '&dateFrom=' + searchParameter, {headers: this.httpHeaders});
  }
  // tslint:disable-next-line:typedef
  getDataBy(search: string, pageNumber: number, size: number){
    // tslint:disable-next-line:max-line-length
      return this.http.get<Notifications>(this.url + '?page=' + pageNumber + '&size=' + size + '&' + search, {headers: this.httpHeaders});
  }
  getOneEntrance(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(this.url + '/get-one/' + id, {headers: this.httpHeaders});
  }
}
