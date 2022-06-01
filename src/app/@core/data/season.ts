import { Observable,  } from 'rxjs';

export abstract class SeasonData {
  abstract getListSeason(): Observable<any>;
  abstract getSeasonById(id): Observable<any>;
  abstract addSeason(data): Observable<any>;
  abstract editSeason(data, id): Observable<any>;
  abstract deleteSeason(id): Observable<any>;
}
