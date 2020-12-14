import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { LoginRequest } from '@shared/interfaces/login-request';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { LoginResponse } from '@shared/interfaces/login-response';
import { catchError } from 'rxjs/operators';
import { getHash } from '@shared/utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorHandlerService,
    private router: Router
  ) {}

  auth(user: LoginRequest, routerPath: string): void {
    const hash = `${getHash(user.username)}:${getHash(user.password)}`;
    localStorage.setItem('base64', 'Basic ' + btoa(hash));

    this.httpClient
      .post<LoginResponse>('api/auth/login', user)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            localStorage.setItem('tokens', null);
            this.errorService.userError(
              'Ошибка авторизации! Пожалуйста, проверьте правильность написания почты и пароля.'
            );
            return of(null);
          }
        })
      )
      .subscribe((response) => {
        AuthorizationService.setToken(response);
        this.router.navigate([routerPath]);
      });
  }

  refreshToken(): void {
    this.httpClient
      .post<LoginResponse>('api/auth/refresh', { refresh_token: this.getTokens().refresh_token })
      .subscribe(AuthorizationService.setToken);
  }

  getTokens(): LoginResponse {
    return JSON.parse(localStorage.getItem('tokens'));
  }

  private static setToken(response: LoginResponse): void {
    // todo Разберист с Cookie
    response.date_expires = new Date().getTime() + response.expires_in * 1000;
    localStorage.setItem('tokens', JSON.stringify(response));
  }
}
