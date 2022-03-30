import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Entrance} from '../model/entrance';
import {PortService} from './port.service';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization: localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'any'
})
export class EntranceService extends PortService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/entrance';

  getData(params: HttpParams): Observable<Entrance> {
    return  this.http.get<Entrance>(this.url, {headers: this.httpHeaders, params: params});
    // if (pageNumber === 0 && size === 0) {
    //   return this.http.get<Entrance>(this.url, {headers: this.httpHeaders});
    // }
    // return this.http.get<Entrance>(this.url + '?page=' + pageNumber + '&size=' + size, {headers: this.httpHeaders});
  }

  findWithParam(params: HttpParams): Observable<Entrance> {
    return  this.http.get<Entrance>(this.url, {headers: this.httpHeaders, params: params});
    //return this.http.get<Entrance>(this.url + '?size=' + size + '&' + param + '=' + name + '&page=' + page, {headers: this.httpHeaders});
  }

  addEntrance(body: Entrance): Observable<any> {
    return this.http.post<Entrance>(this.url + '/add', body, {headers: this.httpHeaders});
  }

  updateEntrance(body: Entrance): Observable<Entrance> {
    return this.http.put<Entrance>(this.url, body, {headers: this.httpHeaders});
  }

  getOneEntrance(id: number): Observable<Entrance> {
    return this.http.get<Entrance>(this.url + '/get-one/' + id, {headers: this.httpHeaders});
  }
}


