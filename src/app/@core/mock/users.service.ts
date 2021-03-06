import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserData, User } from '../data/users';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class UserService extends UserData {

  user: User | undefined;
  isLogined = false;

  constructor(private authService: NbAuthService, 
    private http: HttpClient,
    private toastrService: NbToastrService) {
    super();
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.message || "Server error");
  }

  getToken(): String {
    var token = 'xx.yy.zz';
    if (localStorage.length != 0) {
        token = JSON.parse(localStorage.getItem('auth_app_token'))['value']
    }
    return token;
  }  

  Token;
  getUser(): Observable<User> {
    let url = environment.BASE_URL + '/api/auth/info';
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {    
        if (token.isValid()) {
          this.Token = token['token'];
        }       
      });
    return this.http.get<User>(url).catch(this.errorHandler);
  }

  getOTP(phone, userName, password): Observable<any> {
    var token = this.Token.split(';')[0];
    document.cookie = "BTL=" + token + ";path=/;Secure=false";
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let url = environment.BASE_URL + '/api/sms/getCode';
    const body = JSON.stringify({'phoneNumber': '+84' + phone, 'userName': userName, 'password': password});
    return this.http.post(url, body, {headers: headers}).catch(this.errorHandler);
  }

  verifyOTP(code: any): Observable<any> {
    let url = environment.BASE_URL + '/api/sms/verify';
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify({'code': code});
    return this.http.post(url, body, {'headers':headers}).catch(this.errorHandler);
  }

  EditUser(user, id) {
    let url = environment.BASE_URL + `/api/v1/user/${id}`;
    return this.http.put(url, user);
  }
  
  getAvatarUser() {
    let url = environment.BASE_URL + '/api/v1/user/avatar';
    return this.http.get(url, { responseType: 'blob' });     
  }

  uploadAvatar(image) {
    if (!image) {
      this.toastrService.show('Upload Avatar kh??ng th??nh c??ng', 'L???i', { status: 'danger' });
      return;
    }
    const formData: FormData = new FormData();
    formData.append('avatar', image);
    let url = environment.BASE_URL + '/api/v1/user/avatar';
    return this.http.post(url, formData)  
  }
  
  updateUser(id: any, data: any, confirm): Observable<any> {
    let url = environment.BASE_URL + `/api/auth/user/${id}/${confirm}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }

  changeAuth(id: any, auth: String): Observable<any> {
    let url = environment.BASE_URL + `/api/auth/user/${id}/${auth}`;
    return this.http.get(url).catch(this.errorHandler);     
  }

  getUsers(): Observable<any> {
    let url = environment.BASE_URL + `/api/user/getUsers`;
    return this.http.get(url).catch(this.errorHandler);     
  }

  addUser(data: any): Observable<any> {
    let url = environment.BASE_URL + `/api/user/addUser`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.post(url, body, {headers: headers}).catch(this.errorHandler);
  }

  getUserById(id: any): Observable<any> {
    let url = environment.BASE_URL + `/api/user/info?id=${id}`;
    return this.http.get(url).catch(this.errorHandler);     
  }

  updateUserById(data: any): Observable<any> {
    let url = environment.BASE_URL + '/api/user/updateUser';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = JSON.stringify(data);
    return this.http.put(url, body, {headers: headers}).catch(this.errorHandler);
  }
}
