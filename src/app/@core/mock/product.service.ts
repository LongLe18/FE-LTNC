import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductData } from '../data/product';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService extends ProductData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getListProduct(): Observable<any> {
    let url = environment.BASE_URL + '/api/Product/getproducts';
    return this.http.get(url).catch(this.errorHandler)    
  }

  getListProductByPage(pageIndex: any, pageSize: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getproducts/${pageSize}/${pageIndex}`;
    return this.http.get(url).catch(this.errorHandler)    
  }

  getListProductByCategory(idCategory: any, pageIndex: any, pageSize: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getProductByCategory?IDCategory=${idCategory}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this.http.get(url).catch(this.errorHandler);
  }
}
