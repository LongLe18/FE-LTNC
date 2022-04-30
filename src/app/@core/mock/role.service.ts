import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { of as observableOf, Observable } from 'rxjs';

@Injectable() 
export class NbSimpleRoleProvider extends NbRoleProvider  {
    constructor(private authService: NbAuthService) {
        super();
      }
    
    getRole(): Observable<string> {
      var role = '';
      this.authService.onTokenChange()
          .subscribe((token: NbAuthJWTToken) => {    
          if (token.isValid()) {
              role = token.getPayload()['admin'] == true ? 'admin' : 'user';
          }       
          });
      return observableOf(role);
    }
     
}