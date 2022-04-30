import { Observable } from 'rxjs';

export abstract class ProductData {
  abstract getListProduct(): Observable<any>;
  abstract getListProductByPage(pageIndex, pageSize): Observable<any>;
  abstract getListProductByCategory(idCategory, pageIndex, pageSize): Observable<any>;
}
