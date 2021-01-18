import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { HttpService } from '@shared/interfaces/http-service';
import { HttpBackService } from '@shared/services/http-back.service';
import { Car } from '@shared/classes/car';

@Injectable({
  providedIn: 'root',
})
export class CarService implements HttpService<Car> {
  constructor(private httpBack: HttpBackService, private errorHandler: ErrorHandlerService) {}

  getAll(): Observable<Car[]> {
    return this.httpBack.getAll<Car>('car').pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
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

  get(id: string): Observable<Car> {
    return this.httpBack.get<Car>('car', id).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((car) => {
        car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
          ? `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${car.thumbnail.path}`
          : car.thumbnail.path;
        return car;
      })
    );
  }

  post(car: Car): Observable<Car> {
    return this.httpBack.post('car', car);
  }

  put(car: Car): Observable<Car> {
    return this.httpBack.put<Car>('car', car);
  }

  delete(id: string): Observable<void | object> {
    return this.httpBack.delete<Car>('car', id);
  }
}
