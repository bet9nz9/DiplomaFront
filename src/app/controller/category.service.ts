import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/category';
import {PortService} from './port.service';

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization : localStorage.getItem('Authorization')
// });

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends PortService{

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization')
    });
  }

  url = 'http://localhost:' + this.port + '/category';

  getAll(): Observable<Category>{
    return this.http.get<Category>(this.url, {headers: this.httpHeaders});
  }

  addCategory(body: Category): Observable<any>{
    return this.http.post<Category>(this.url + '/add', body, {headers: this.httpHeaders});
  }

  updateCategory(body: Category): Observable<Category> {
    return this.http.put<Category>(this.url, body, {headers: this.httpHeaders});
  }

  getOneCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + '/get-one/' + id, {headers: this.httpHeaders});
  }

  deleteCategory(id: number): Observable<Category>{
    return this.http.delete<Category>(this.url + '/delete/' + id, {headers: this.httpHeaders});
  }
}
