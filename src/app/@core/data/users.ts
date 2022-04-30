import { Observable } from 'rxjs';

export interface User {
  name: string;
  picture: string;
}

export abstract class UserData {
  abstract getToken(): String;
  abstract getUser(): Observable<User>;
  abstract getOTP(phone, userName, password): Observable<any>;
  abstract verifyOTP(code): Observable<any>;
  abstract EditUser(user, id);
  abstract getAvatarUser();
  abstract uploadAvatar(image);
  abstract updateUser(id, data): Observable<any>;
}
