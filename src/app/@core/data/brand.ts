import { Observable } from 'rxjs';

export abstract class BrandData {
  abstract getBrand(): Observable<any>;
  abstract getListParentBrand(): Observable<any>;
  abstract getListSubBrand(id): Observable<any>;
  abstract getAds(): Observable<any>;
}
