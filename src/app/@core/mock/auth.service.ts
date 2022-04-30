import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserData } from '../data/users';
@Injectable() 
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private service: UserData) { }

    intercept(req, next){
        let tokenizedReq = req.clone({
            setHeaders: {
                'X-API-KEY' : this.service.getToken()
            }
        })
        return next.handle(tokenizedReq);
    }
}