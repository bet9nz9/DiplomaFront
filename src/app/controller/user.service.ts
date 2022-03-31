import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {PortService} from './port.service';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'root'
})
export class UserService extends PortService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/users';

  getAll(): Observable<User> {
    return this.http.get<User>(this.url, {headers: this.httpHeaders});
  }

  getAllWithPagination(params: HttpParams): Observable<User> {
    return  this.http.get<User>(this.url, {headers: this.httpHeaders, params: params});
  }

  findWithParam(params: HttpParams): Observable<User> {
    return  this.http.get<User>(this.url, {headers: this.httpHeaders, params: params});
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/get-one/' + id, {headers: this.httpHeaders});
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url, user, {headers: this.httpHeaders});
  }

  deleteUser(userId: number): Observable<any> {
    console.log(this.url + '/' + userId);
    return this.http.delete<any>(this.url + '/' + userId, {headers: this.httpHeaders});
  }
}
