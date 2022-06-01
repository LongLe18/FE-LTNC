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
  abstract updateUser(id, data, confirm): Observable<any>;
  abstract changeAuth(id, auth): Observable<any>;

  /// account manager
  abstract getUsers(): Observable<any>;
  abstract addUser(data): Observable<any>;
  abstract getUserById(id): Observable<any>;
  abstract updateUserById(data): Observable<any>;
}
