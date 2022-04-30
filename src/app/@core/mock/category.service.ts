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
}
