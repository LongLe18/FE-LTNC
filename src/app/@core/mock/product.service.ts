import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductData } from '../data/product';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  getProduct(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getProductByID?id=${id}`;
    return this.http.get(url).catch(this.errorHandler)     
  }

  getImageDetailProduct(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getImageDetail?id=${id}`;
    return this.http.get(url).catch(this.errorHandler)
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

  getListProductByBrand(idBrand: any, pageIndex: any, pageSize: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getProductByIDBrand?id_Brand=${idBrand}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this.http.get(url).catch(this.errorHandler);
  }

  getListSaleProducts(): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getSaleProduct`;
    return this.http.get(url).catch(this.errorHandler);
  }

  getInsurranceProduct(id): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getInsurrenceBySeri/${id}`;
    return this.http.get(url).catch(this.errorHandler);
  }

  checkout(data: any): Observable<any> {
    let url = environment.BASE_URL + '/api/checkout/checkout';
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(data);
    return this.http.post(url, body, {'headers':headers}).catch(this.errorHandler);
  }

  addProduct(data: any): Observable<any> {
    let url = environment.BASE_URL + '/api/Product/AddProduct';
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(data);
    return this.http.post(url, body, {'headers':headers}).catch(this.errorHandler);
  }

  getSeason(): Observable<any> {
    let url = environment.BASE_URL + '/api/Season/getSeason';
    return this.http.get(url).catch(this.errorHandler);
  }

  deleteProduct(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/Delete?id=${id}`;
    return this.http.delete(url).catch(this.errorHandler);
  }

  editProduct(data: any, id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/ChangeProduct?id=${id}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }

  search(idBrand: any, idCate: any, idSeason: any, describe: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/search?idcate=${idCate}&idseason=${idSeason}&describe=${describe}&idbrand=${idBrand}`;
    return this.http.get(url).catch(this.errorHandler);
  }

  getListProductFastly(): Observable<any> {
    let url = environment.BASE_URL + `/api/Product/getProductFastly`;
    return this.http.get(url).catch(this.errorHandler);
  }
}
