import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {

  constructor(public fireAuth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.fireAuth.auth.currentUser ? this.fireAuth.auth.currentUser['qa'] : undefined;
    let headers = new HttpHeaders();
    
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');
    if (token) headers.append('Authorization', `Bearer ${token}`);
    req = req.clone({
      headers: headers
    });

    return next.handle(req);
  }
}