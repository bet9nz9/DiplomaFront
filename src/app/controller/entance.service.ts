import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Entrance} from '../model/entrance';
import {PortService} from './port.service';

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
  }

  findWithParam(params: HttpParams): Observable<Entrance> {
    return  this.http.get<Entrance>(this.url, {headers: this.httpHeaders, params: params});
  }

  addEntrance(body: Entrance): Observable<any> {
    debugger
    return this.http.post<Entrance>(this.url + '/add', body, {headers: this.httpHeaders});
  }

  updateEntrance(body: Entrance): Observable<Entrance> {
    debugger
    return this.http.put<Entrance>(this.url, body, {headers: this.httpHeaders});
  }

  getOneEntrance(id: number): Observable<Entrance> {
    return this.http.get<Entrance>(this.url + '/get-one/' + id, {headers: this.httpHeaders});
  }
}


