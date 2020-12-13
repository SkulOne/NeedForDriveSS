import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '@shared/services/authorization.service';

@Injectable()
export class DefaultHeaderBackendInterceptor implements HttpInterceptor {
  private readonly userToken = '52efbe08228671240494f537f2486bc109a637b4';
  constructor(private authorizationService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('api/db/')) {
      this.checkToken();
      request = request.clone({
        headers: request.headers.set('X-Api-Factory-Application-Id', '5e25c641099b810b946c5d5b'),
      });
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
      request = request.clone({
        headers: request.headers.set('Authorization', this.checkRole()),
      });

      return next.handle(request);
    }
    return next.handle(request);
  }

  private checkRole(): string {
    if (this.authorizationService.getTokens()) {
      const adminAccessToken = this.authorizationService.getTokens().access_token;
      return `Bearer ${adminAccessToken}`;
    } else {
      return `Bearer ${this.userToken}`;
    }
  }

  private checkToken(): any {
    const tokens = this.authorizationService.getTokens();
    const currentDateMs = new Date().getTime();
    const spareTime = 600000;
    if (tokens?.date_expires - currentDateMs < spareTime) {
      this.authorizationService.refreshToken();
    }
  }
}
