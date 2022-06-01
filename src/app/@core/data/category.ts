import { Observable,  } from 'rxjs';

export abstract class CategoryData {
  abstract getListParentCategory(): Observable<any>;
  abstract getListSubCategory(id): Observable<any>;
  abstract addCate(data): Observable<any>;
  abstract editCate(data, id): Observable<any>;
  abstract deleteCate(id): Observable<any>;
}
