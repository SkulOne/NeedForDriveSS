import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../interfaces/response-result';
import { Car } from '../interfaces/car';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) {}

  getCars(): Observable<Car[]> {
    return this.httpClient.get<ResponseResult<Car[]>>('api/db/car').pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((result) => {
        result.data.forEach((car) => {
          car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
            ? `http://api-factory.simbirsoft1.com/http://api-factory.simbirsoft1.com${car.thumbnail.path}`
            : car.thumbnail.path;
        });
        return result.data;
      })
    );
  }
}
