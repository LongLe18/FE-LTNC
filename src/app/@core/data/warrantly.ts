import { Observable } from 'rxjs';

export abstract class WarrantlyData {
  abstract getListWarrantly(): Observable<any>;
  abstract getWarrantlyById(id): Observable<any>;
  abstract updateWarranty(data, id): Observable<any>;
}
