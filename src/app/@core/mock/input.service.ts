import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InputData } from '../data/input';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class InputService extends InputData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }


  getListReceipts(): Observable<any> {
    let url = environment.BASE_URL + `/api/Receipt/getReceipt`;
    return this.http.get(url).catch(this.errorHandler)      
  }

  getReceiptById(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Receipt/getReceiptByID?id=${id}`;
    return this.http.get(url).catch(this.errorHandler)     
  }

  getReceiptDetailById(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Receipt/getReceiptDetailByID?id=${id}`;
    return this.http.get(url).catch(this.errorHandler)  
  }

  addReceipt(data): Observable<any> {
    let url = environment.BASE_URL + '/api/Receipt/addRecepit';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post(url, body, {headers: headers}).catch(this.errorHandler);
  }

  deleteReceipt(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Receipt/Delete?id=${id}`;
    return this.http.delete(url).catch(this.errorHandler)
  }

  dashboard(data): Observable<any> {
    let url = environment.BASE_URL + `/api/Receipt/dashboard`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post(url, body, {headers: headers}).catch(this.errorHandler)
  }

  dashboard2(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Receipt/dashboard2?idcate=${id}`;
    return this.http.get(url).catch(this.errorHandler);
  }
}
