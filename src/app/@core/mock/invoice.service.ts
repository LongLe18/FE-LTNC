import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InvoiceData } from '../data/invoice';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class InvoiceService extends InvoiceData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getListInvoices2(): Observable<any> {
    let url = environment.BASE_URL + '/api/Invoice/getInvoice2';
    return this.http.get(url).catch(this.errorHandler)    
  }

  getListInvoices(): Observable<any> {
    let url = environment.BASE_URL + `/api/Invoice/getInvoice`;
    return this.http.get(url).catch(this.errorHandler)      
  }

  getInvoiceById(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Invoice/getInvoiceByID?id=${id}`;
    return this.http.get(url).catch(this.errorHandler)     
  }

  changeStatusInvoice(id: any, status: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Invoice/ChangeInvoice?id=${id}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(status);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }

  getDetailInvoice(idInvoice: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Invoice/getDetailInvoice?id=${idInvoice}`;
    return this.http.get(url).catch(this.errorHandler)
  }
}
