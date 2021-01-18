import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseResult } from '@shared/interfaces/response-result';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { getId } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class HttpBackService {
  private backUrl = 'api/db';

  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) {}

  getAll<T>(
    entityName: string,
    page: number = 0,
    limit: number = 49,
    filterProperties?: unknown[]
  ): Observable<T[]> {
    let params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    if (filterProperties && filterProperties.length) {
      filterProperties.forEach((property) => {
        const [key, value] = Object.entries(property)[0];
        params = params.append(key, value);
      });
    }
    return this.httpClient
      .get<ResponseResult<T[]>>(`${this.backUrl}/${entityName}`, { params })
      .pipe(
        catchError((err) => this.errorHandler.handleHttpError(err)),
        map((result) => result.data)
      );
  }

  get<T>(entityName: string, id: string): Observable<T> {
    return this.httpClient.get<ResponseResult<T>>(`${this.backUrl}/${entityName}/${id}`).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((result) => result.data)
    );
  }

  delete<T>(entityName: string, id: string): Observable<void | object> {
    return this.httpClient
      .delete(`${this.backUrl}/${entityName}/${id}`)
      .pipe(catchError((err) => this.errorHandler.handleHttpError(err)));
  }

  post<T>(entityName: string, entity: T): Observable<T> {
    return this.httpClient.post<ResponseResult<T>>(`${this.backUrl}/${entityName}`, entity).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((value) => value.data)
    );
  }

  put<T>(entityName: string, entity: T, id?: string): Observable<T> {
    return this.httpClient
      .put<ResponseResult<T>>(`${this.backUrl}/${entityName}/${id ? id : getId(entity)}`, entity)
      .pipe(
        catchError((err) => this.errorHandler.handleHttpError(err)),
        map((value) => value.data)
      );
  }
}
