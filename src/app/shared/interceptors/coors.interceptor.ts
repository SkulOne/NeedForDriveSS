import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CoorsInterceptor implements HttpInterceptor {
  private readonly redirectURL = 'https://cors-anywhere.herokuapp.com';
  private readonly backendURL = 'http://api-factory.simbirsoft1.com';
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      (request.url.includes('api/db') || request.url.includes('api/auth')) &&
      environment.production
    ) {
      const req = request.clone({
        url: `${this.redirectURL}/${this.backendURL}/${request.url}`,
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
