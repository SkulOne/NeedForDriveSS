import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../interfaces/response-result';
import { ICar } from '../interfaces/ICar';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { HttpService } from '@shared/interfaces/http-service';
import { HttpBackService } from '@shared/services/http-back.service';

@Injectable({
  providedIn: 'root',
})
export class CarService implements HttpService<ICar> {
  constructor(private httpBack: HttpBackService, private errorHandler: ErrorHandlerService) {}

  getAll(): Observable<ICar[]> {
    return this.httpBack.getAll<ICar>('car').pipe(
      map((result) => {
        result.forEach((car) => {
          if (car.thumbnail) {
            car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
              ? `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${car.thumbnail.path}`
              : car.thumbnail.path;
          }
        });
        return result;
      })
    );
  }

  get(id: string): Observable<ICar> {
    return this.httpBack.get<ICar>('car', id).pipe(
      map((car) => {
        car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
          ? `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${car.thumbnail.path}`
          : car.thumbnail.path;
        return car;
      })
    );
  }

  post(car: ICar): Observable<ICar> {
    return this.httpBack.post('car', car);
  }

  put(car: ICar): Observable<ICar> {
    return this.httpBack.put<ICar>('car', car);
  }

  delete(id: string): Observable<void | object> {
    return this.httpBack.delete<ICar>('car', id);
  }
}
