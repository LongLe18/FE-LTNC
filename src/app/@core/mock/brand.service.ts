import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BrandData } from '../data/brand';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class BrandService extends BrandData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getListParentBrand(): Observable<any> {
    let url = environment.BASE_URL + '/api/brand/getParentBrand';
    return this.http.get(url).catch(this.errorHandler)    
  }

  getListSubBrand(id): Observable<any> {
    let url = environment.BASE_URL + `/api/brand/getSubBrand/${id}`;
    return this.http.get(url).catch(this.errorHandler)      
  }

  getAds(): Observable<any> {
    let url = environment.BASE_URL + '/api/ads/getAds';
    return this.http.get(url).catch(this.errorHandler)   
  }
}
