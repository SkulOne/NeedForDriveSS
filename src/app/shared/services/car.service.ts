import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../interfaces/response-result';
import { ICar } from '../interfaces/ICar';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) {}

  getAll(): Observable<ICar[]> {
    return this.httpClient.get<ResponseResult<ICar[]>>('api/db/car').pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((result) => {
        result.data.forEach((car) => {
          car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
            ? `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${car.thumbnail.path}`
            : car.thumbnail.path;
        });
        return result.data;
      })
    );
  }

  get(id: string): Observable<ICar> {
    return this.httpClient.get<ResponseResult<ICar>>(`api/db/car/${id}`).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((result) => {
        const car = result.data;
        car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
          ? `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${car.thumbnail.path}`
          : car.thumbnail.path;
        return car;
      })
    );
  }

  post(car: ICar): Observable<ICar> {
    return this.httpClient.post<ResponseResult<ICar>>(`api/db/car`, car).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((value) => {
        return value.data;
      })
    );
  }

  put(car: ICar): Observable<ICar> {
    return this.httpClient.put<ResponseResult<ICar>>(`api/db/car/${car.id}`, car).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((value) => {
        return value.data;
      })
    );
  }
}
