import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthorizationService } from '@shared/services/authorization.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class DefaultHeaderBackendInterceptor implements HttpInterceptor {
  private readonly userToken = '52efbe08228671240494f537f2486bc109a637b4';

  constructor(private authorizationService: AuthorizationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('api/db/')) {
      req = this.setHeaders(req);
      return next.handle(req).pipe(
        catchError((err) => {
          if (err.status === 401) {
            return this.authorizationService.refreshToken().pipe(
              mergeMap((tokens) => {
                this.authorizationService.setToken(tokens);
                req = this.setHeaders(req);
                return next.handle(req);
              })
            );
          }
          return throwError(err);
        })
      );
    }
    return next.handle(req);
  }

  private setHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let headers = new HttpHeaders();
    headers = headers.append('X-Api-Factory-Application-Id', '5e25c641099b810b946c5d5b');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', this.checkRole());
    return request.clone({ headers });
  }

  private checkRole(): string {
    if (this.authorizationService.getTokens()) {
      const adminAccessToken = this.authorizationService.getTokens().accessToken;
      return `Bearer ${adminAccessToken}`;
    }
    return `Bearer ${this.userToken}`;
  }
}
