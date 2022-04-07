import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from "../model/address";
import {PortService} from './port.service';
import {Service} from "../model/service";

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'root'
})
export class AddressService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/address';

  getAddressesByBuildingId(params: HttpParams): Observable<Address> {
    return this.http.get<Address>(this.url, {headers: this.httpHeaders, params: params});
  }

  getAddressesByUser(params: HttpParams): Observable<Address>{
    return this.http.get<Address>(this.url, {headers: this.httpHeaders, params: params});
  }

  search(params: HttpParams): Observable<Address> {
    return this.http.get<Address>(this.url, {headers: this.httpHeaders, params: params});
  }

  updateAddress(body: Address): Observable<any> {
    return  this.http.put<Address>(this.url, body, {headers: this.httpHeaders});
  }

  createAddress(body: Address): Observable<any> {
    return  this.http.post<Address>(this.url + '/add', body, {headers: this.httpHeaders});
  }

  getById(id: number): Observable<Address> {
    return this.http.get<Address>(this.url + '/' + id, {headers: this.httpHeaders});
  }

}
