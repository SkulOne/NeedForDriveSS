import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (request.url.includes('auth/login')) {
    //   const req = request.clone({
    //     url: `https://cors-anywhere.herokuapp.com/` + request.url,
    //   });
    //   return next.handle(req);
    // }
    return next.handle(request);
  }
}
