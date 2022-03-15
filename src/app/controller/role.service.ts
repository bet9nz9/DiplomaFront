import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../model/role';
import {PortService} from './port.service';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'root'
})
export class RoleService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/role';

  getAll(): Observable<Role> {
    return this.http.get<Role>(this.url, {headers: this.httpHeaders});
  }
}
