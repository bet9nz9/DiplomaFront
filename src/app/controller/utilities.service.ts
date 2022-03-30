import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utility } from '../model/utility';
import {Service} from "../model/service";
import {PortService} from './port.service';
import {Entrance} from "../model/entrance";

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
    // if (pageNumber === null && size === null){
    //   if (searchParameter != '' && serviceId === null){
    //     return this.http.get<Utility>(this.url + '?' + searchParameter, {headers: this.httpHeaders});
    //   }else if(searchParameter != '' && serviceId !== null){
    //     return this.http.get<Utility>(this.url + '?' + searchParameter+'&service=='+serviceId, {headers: this.httpHeaders});
    //   }
    // }
    // if (searchParameter !== ''){
    //   return this.http.get<Utility>(this.url + '?page=' + pageNumber + '&size=' + size + '&' + searchParameter, {headers: this.httpHeaders});
    // }
    // if (serviceId === 0){
    //   return this.http.get<Utility>(this.url + '?page=' + pageNumber + '&size=' + size + '&sort=dateAndTime:DESC', {headers: this.httpHeaders});
    // }else {
    //   return this.http.get<Utility>(this.url + '?page=' + pageNumber + '&size=' + size + '&service==' + serviceId, {headers: this.httpHeaders});
    // }
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

  getServices(): Observable<Service>{
    return this.http.get<Service>(this.url+'/services', {headers: this.httpHeaders});
  }
}
