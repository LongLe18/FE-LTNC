import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { UserData } from './data/users';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router, private userService: UserData) {
    }

    canActivate() {
      return this.authService.isAuthenticated() // canActive can return Observable<boolean>, which is exactly what isAuthenticated returns
      .pipe(
        tap(authenticated => {
          if (!authenticated) {    
            this.router.navigate(['auth/login']);
          } else { // đã đăng nhập
            this.userService.getUser().subscribe(res => {
              if (res["roles"][0].name != 'ROLE_USER') {
                this.router.navigate(['/pages-admin/account-manager']);
              } else {
                if ( window.location.href === 'http://localhost:4200/pages-user/profile') {
                  this.router.navigate(['/pages-user/profile']);
                } else if (window.location.href === 'http://localhost:4200/pages-user/checkout') {
                  this.router.navigate(['/pages-user/checkout']);
                } else {
                  this.router.navigate(['/pages-user/main']);
                }
              }
            })
          }
        }),
      ); 
    }
}