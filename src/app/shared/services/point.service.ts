import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {ResponseResult} from '../interfaces/response-result';
import {Observable} from 'rxjs';
import {Point} from '../interfaces/point';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  constructor(private httpClient: HttpClient) {}

  getPointsFormCity(cityId: string): Observable<Point[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
        Authorization: 'Bearer 52efbe08228671240494f537f2486bc109a637b4',
      }),
    };
    return (
      this.httpClient
        .get<ResponseResult>(
          `http://api-factory.simbirsoft1.com/api/db/point?cityId=${cityId}`,
          httpOptions
        )
        // @ts-ignore
        .pipe(map((result) => result.data))
    );
  }
}
