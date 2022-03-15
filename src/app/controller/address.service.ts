import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from "../model/address";
import {PortService} from './port.service';

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

  getAddressesByBuildingId(pageNumber: number, size: number, buildingId: number): Observable<Address> {
    if (pageNumber !== null && size !== null) {
      return this.http.get<Address>(this.url + '?page=' + pageNumber + '&size=' + size +
        '&' + 'building==' + buildingId, {headers: this.httpHeaders});
    } else {
      return this.http.get<Address>(this.url + '?building==' + buildingId, {headers: this.httpHeaders});
    }

  }

  getAddressesByUser(userId: number): Observable<Address>{
    return this.http.get<Address>(this.url + '?user==' + userId, {headers: this.httpHeaders});
  }

  search(pageNumber: number, size: number, buildingId: number, search: string): Observable<Address> {
    if (search === null) {
      return this.http.get<Address>(this.url + '?building==' + buildingId, {headers: this.httpHeaders});
    } else {
      return this.http.get<Address>(this.url + '?building==' + buildingId + search, {headers: this.httpHeaders});
    }
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
