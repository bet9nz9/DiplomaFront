import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PortService} from './port.service';
import {Ekey} from '../model/ekey';

@Injectable({
  providedIn: 'root'
})
export class EKeyService extends PortService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/keys';

  getEKeyByUserId(params: HttpParams): Observable<Ekey> {
    return  this.http.get<Ekey>(this.url, {headers: this.httpHeaders, params: params});
  }

  getData(params: HttpParams): Observable<Ekey> {
    return this.http.get<Ekey>(this.url, {headers: this.httpHeaders, params: params})
    // if (pageNumber === 0 && size === 0) { return this.http.get<Ekey>(this.url, {headers: this.httpHeaders}); }
    // return this.http.get<Ekey>(this.url + '?page=' + pageNumber + '&size=' + size, {headers: this.httpHeaders});
  }

  addKey(body: Ekey): Observable<Ekey> {
    return this.http.post<Ekey>(this.url + '/add', body, {headers: this.httpHeaders});
  }

  updateKey(body: Ekey): Observable<Ekey> {
    return this.http.put<Ekey>(this.url, body, {headers: this.httpHeaders});
  }

  findWithParam(params: HttpParams): Observable<Ekey> {
    return this.http.get<Ekey>(this.url, {headers: this.httpHeaders, params: params})
    //return this.http.get<Ekey>(this.url + '?size=' + size + '&' + param + '=' + name + '&page=' + page, {headers: this.httpHeaders});
  }

  getOne(eKeyId: number): Observable<Ekey> {
    return this.http.get<Ekey>(this.url + '/get-one/' + eKeyId, {headers: this.httpHeaders});
  }
}
