import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryId } from '@shared/interfaces/ICar';
import { ResponseResult } from '@shared/interfaces/response-result';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) {}

  getAll(): Observable<CategoryId[]> {
    return this.httpClient.get<ResponseResult<CategoryId[]>>('api/db/category').pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((result) => result.data)
    );
  }
}
