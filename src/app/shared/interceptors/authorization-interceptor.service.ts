import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('auth')) {
      request = request.clone({
        headers: request.headers.set('Authorization', localStorage.getItem('base64')),
      });
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
