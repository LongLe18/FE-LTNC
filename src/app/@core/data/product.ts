import { Observable } from 'rxjs';

export abstract class ProductData {
  abstract getProduct(id): Observable<any>;
  abstract getImageDetailProduct(id): Observable<any>;
  abstract getListProduct(): Observable<any>;
  abstract getListProductByPage(pageIndex, pageSize): Observable<any>;
  abstract getListProductByCategory(idCategory, pageIndex, pageSize): Observable<any>;
  abstract getListProductByBrand(idBrand, pageIndex, pageSize): Observable<any>;
  abstract getListSaleProducts(): Observable<any>;
  abstract getInsurranceProduct(id): Observable<any>;

  abstract checkout(data): Observable<any>;
}
