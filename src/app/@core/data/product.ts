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
  abstract getListProductFastly(): Observable<any>;

  abstract checkout(data): Observable<any>;

  abstract addProduct(data): Observable<any>;
  abstract deleteProduct(id): Observable<any>;
  abstract editProduct(data, id): Observable<any>;
  // get season
  abstract getSeason(): Observable<any>;

  abstract search(idBrand, idCate, idSeason, describe): Observable<any>;
}
