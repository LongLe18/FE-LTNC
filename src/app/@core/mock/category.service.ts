import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoryData } from '../data/category';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService extends CategoryData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getListParentCategory(): Observable<any> {
    let url = environment.BASE_URL + '/api/Category/getCategory';
    return this.http.get(url).catch(this.errorHandler)    
  }

  getListSubCategory(id): Observable<any> {
    let url = environment.BASE_URL + `/api/Category/getSubCategory/${id}`;
    return this.http.get(url).catch(this.errorHandler)      
  }

  addCate(data: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Category/AddCategory`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post(url, body, {headers: headers}).catch(this.errorHandler);
  }

  editCate(data: any, id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Category/ChangeCategory?id=${id}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }

  deleteCate(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Category/Delete?id=${id}`;
    return this.http.delete(url).catch(this.errorHandler)
  }
}
