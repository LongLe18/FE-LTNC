import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WarrantlyData } from '../data/warrantly';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class WarrantlyService extends WarrantlyData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getListWarrantly(): Observable<any> {
    let url = environment.BASE_URL + '/api/warranty/getWarranty';
    return this.http.get(url).catch(this.errorHandler)   
  }

  getWarrantlyById(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/warranty/getWarranty/${id}`;
    return this.http.get(url).catch(this.errorHandler)   
  }

  updateWarranty(data: any, id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/warranty/ChangeWarranty?id=${id}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }
}
