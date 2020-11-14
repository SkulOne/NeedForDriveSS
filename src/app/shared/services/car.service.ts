import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../const';
import { ResponseResult } from '../interfaces/response-result';
import { Car } from '../interfaces/car';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.httpClient.get<ResponseResult<Car>>('api/db/car', httpOptions).pipe(
      map((result) => {
        result.data.forEach((car) => {
          car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
            ? `http://api-factory.simbirsoft1.com${car.thumbnail.path}`
            : car.thumbnail.path;
        });
        return result.data;
      })
    );
  }
}
