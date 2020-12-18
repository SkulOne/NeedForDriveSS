import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryId } from '@shared/interfaces/ICar';
import { ResponseResult } from '@shared/interfaces/response-result';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<CategoryId[]> {
    return this.httpClient
      .get<ResponseResult<CategoryId[]>>('api/db/category')
      .pipe(map((result) => result.data));
  }
}
