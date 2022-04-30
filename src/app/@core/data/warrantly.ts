import { Observable } from 'rxjs';

export abstract class WarrantlyData {
  abstract getListWarrantly(): Observable<any>;
  abstract getWarrantlyBySeri(seri): Observable<any>;
}
