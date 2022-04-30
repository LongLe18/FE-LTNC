import { Observable } from 'rxjs';

export abstract class CategoryData {
  abstract getListParentCategory(): Observable<any>;
  abstract getListSubCategory(id): Observable<any>;
}
