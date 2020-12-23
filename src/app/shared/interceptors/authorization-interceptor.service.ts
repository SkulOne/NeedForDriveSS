import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('api/auth')) {
      request = this.setHeaders(request);
    }
    return next.handle(request);
  }

  private setHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', localStorage.getItem('base64'));
    headers = headers.append('Content-Type', 'application/json');
    return request.clone({ headers });
  }
}
