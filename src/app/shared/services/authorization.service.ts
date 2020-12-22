import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '@shared/interfaces/login-request';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { LoginResponse, Tokens } from '@shared/interfaces/login-response';
import { catchError, map } from 'rxjs/operators';
import { getHash } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private httpClient: HttpClient, private errorService: ErrorHandlerService) {}

  auth(user: LoginRequest): Observable<Tokens> {
    const hash = `${getHash(user.username)}:${getHash(user.password)}`;
    localStorage.setItem('base64', 'Basic ' + btoa(hash));

    return this.httpClient.post<LoginResponse>('api/auth/login', user).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.setItem('tokens', null);
          this.errorService.userError(
            'Ошибка авторизации! Пожалуйста, проверьте правильность написания почты и пароля.'
          );
          return of(null);
        }
      }),
      map(this.typeCasting)
    );
  }

  refreshToken(): Observable<Tokens> {
    return this.httpClient
      .post<LoginResponse>('api/auth/refresh', { refresh_token: this.getTokens().refreshToken })
      .pipe(map(this.typeCasting));
  }

  getTokens(): Tokens {
    return JSON.parse(localStorage.getItem('tokens'));
  }

  setToken(response: Tokens): void {
    response.dateExpires = new Date().getTime() + response.expiresIn * 1000;
    localStorage.setItem('tokens', JSON.stringify(response));
  }

  logout(): Observable<any> {
    localStorage.removeItem('tokens');
    return this.httpClient.post('api/auth/logout', {});
  }

  private typeCasting(response: LoginResponse): Tokens {
    return {
      accessToken: response.access_token,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token,
      tokenType: response.token_type,
      userId: response.user_id,
      dateExpires: response.date_expires,
    } as Tokens;
  }
}
