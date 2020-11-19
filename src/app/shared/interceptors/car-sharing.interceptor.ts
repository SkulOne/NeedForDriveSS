import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CarSharingInterceptor implements HttpInterceptor {
  constructor() {}
  private readonly redirectURL = 'https://cors-anywhere.herokuapp.com';
  private readonly backendURL = 'http://api-factory.simbirsoft1.com';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('api/db/') && environment.production) {
      const req = request.clone({
        url: `${this.redirectURL}/${this.backendURL}/${request.url}`,
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
