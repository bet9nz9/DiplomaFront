import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Building} from '../model/building';
import {PortService} from './port.service';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'root'
})
export class BuildingService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/building';

  getAll(): Observable<Building> {
    return this.http.get<Building>(this.url, {headers: this.httpHeaders});
  }

  getById(buildingId: number): Observable<Building>{
    return this.http.get<Building>(this.url + '/' + buildingId, {headers: this.httpHeaders});
  }
}
