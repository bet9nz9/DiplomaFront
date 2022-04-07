import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utility } from '../model/utility';
import {Service} from "../model/service";
import {PortService} from './port.service';
import {Entrance} from "../model/entrance";
import {Address} from "../model/address";

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'any'
})
export class UtilitiesService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/utilities';


  getData(params: HttpParams): Observable<Utility> {
    return  this.http.get<Utility>(this.url, {headers: this.httpHeaders, params: params});
  }

  updateUtility(body: Utility): Observable<any> {
     return this.http.put<Utility>(this.url, body, {headers: this.httpHeaders});
  }

  createUtility(body: Utility): Observable<any> {
    return  this.http.post<Utility>(this.url + '/add', body, {headers: this.httpHeaders});
  }

  getOneUtility(id: number): Observable<Utility> {
    return this.http.get<Utility>(this.url + '/' + id, {headers: this.httpHeaders});
  }

  getServices(params: HttpParams): Observable<Service>{
    return this.http.get<Service>(this.url+'/userServices', {headers: this.httpHeaders, params: params});
  }

  getServicesTypes(): Observable<Service>{
    let params = new HttpParams();
    return this.http.get<Service>(this.url+'/services', {headers: this.httpHeaders, params: params});
  }

  createUserService(body: Service): Observable<any>{
    return  this.http.post<Service>(this.url + '/createUserService', body, {headers: this.httpHeaders});
  }

  updateUserService(body: Service): Observable<any>{
    return  this.http.put<Service>(this.url + '/userServices/update', body, {headers: this.httpHeaders});
  }

  deleteUserService(serviceId: number): Observable<any> {
    return this.http.delete<any>(this.url + '/userServices/' + serviceId, {headers: this.httpHeaders});
  }

}
