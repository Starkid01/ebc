import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {

  constructor(public fireAuth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.fireAuth.auth.currentUser ? this.fireAuth.auth.currentUser['qa'] : false;
    
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    return next.handle(req);
  }
}
