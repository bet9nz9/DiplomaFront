import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {PortService} from './port.service';
import {Observable} from 'rxjs';
import {Token} from '../model/token';
import {ActivationMessage} from "../model/activationMessage";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends PortService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
  }

  url = 'http://localhost:' + this.port;

  addUser(user: User): Observable<any> {
    debugger
    return this.http.post(this.url + '/register', user);
  }

  auth(user: User): Observable<Token> {
    return this.http.post<Token>(this.url + '/auth', user);
  }

  current(): Observable<User> {
    this.httpHeaders = new HttpHeaders().append('Authorization', localStorage.getItem('Authorization').toString());
    return this.http.get<User>(this.url + '/current', {headers: this.httpHeaders});
  }

  getActivation(code: string): Observable<ActivationMessage> {
    return this.http.get<ActivationMessage>(this.url + '/activate/' + code);
  }

  isLogin(): boolean {
    return localStorage.getItem('Authorization') != null;
  }

  logout(): void {
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('Authorization');
  }
}
