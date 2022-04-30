import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WarrantlyData } from '../data/warrantly';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getWarrantlyBySeri(seri: any): Observable<any> {
    let url = environment.BASE_URL + `/api/warranty/getWarranty/${seri}`;
    return this.http.get(url).catch(this.errorHandler)   
  }
}
