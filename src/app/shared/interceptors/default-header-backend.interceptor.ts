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
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { flatMap } from 'rxjs/internal/operators';

@Injectable()
export class DefaultHeaderBackendInterceptor implements HttpInterceptor {
  private readonly userToken = '52efbe08228671240494f537f2486bc109a637b4';

  constructor(private _router: Router, private authorizationService: AuthorizationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('api/db/')) {
      req = this.setHeaders(req);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authorizationService.refreshToken().pipe(
            flatMap((tokens) => {
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

// todo Мб пригодится, если повалится новое решение
// private checkToken(): any {
//   const tokens = this.authorizationService.getTokens();
//   const currentDateMs = new Date().getTime();
//   const spareTime = 600000;
//   if (tokens?.dateExpires - currentDateMs < spareTime) {
//     this.authorizationService.refreshToken();
//   }
// }
// authorization.service.ts
// refreshToken(): void {
//   this.httpClient
//     .post<LoginResponse>('api/auth/refresh', { refresh_token: this.getTokens().refreshToken })
//     .pipe(map(this.typeCasting))
//     .subscribe(this.setToken);
// }
