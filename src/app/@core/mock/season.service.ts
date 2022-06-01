import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SeasonData } from '../data/season';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SeasonService extends SeasonData {

  constructor(
    private http: HttpClient,) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getListSeason(): Observable<any> {
    let url = environment.BASE_URL + '/api/Season/getSeason';
    return this.http.get(url).catch(this.errorHandler)    
  }

  getSeasonById(id): Observable<any> {
    let url = environment.BASE_URL + `/api/Season/getSeason/${id}`;
    return this.http.get(url).catch(this.errorHandler)      
  }

  addSeason(data: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Season/addSeason`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post(url, body, {headers: headers}).catch(this.errorHandler);
  }

  editSeason(data: any, id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Season/ChangeSeason?id=${id}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }

  deleteSeason(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/Season/Delete?id=${id}`;
    return this.http.delete(url).catch(this.errorHandler)
  }
}
