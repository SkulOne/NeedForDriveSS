import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultHeaderBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('api/db/')) {
      request = request.clone({
        headers: request.headers.set('X-Api-Factory-Application-Id', '5e25c641099b810b946c5d5b'),
      });
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer 52efbe08228671240494f537f2486bc109a637b4'
        ),
      });

      return next.handle(request);
    }
    return next.handle(request);
  }
}
