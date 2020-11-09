import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineAll, map, mergeMap } from 'rxjs/operators';
import { ResponseResult } from '../interfaces/response-result';
import { Observable } from 'rxjs';
import { Point } from '../interfaces/point';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      Authorization: 'Bearer 52efbe08228671240494f537f2486bc109a637b4',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private locationService: LocationService
  ) {}

  getPointsFormCity(cityId: string): Observable<Point[]> {
    return this.httpClient
      .get<ResponseResult<Point>>(
        `http://api-factory.simbirsoft1.com/api/db/point?cityId=${cityId}`,
        this.httpOptions
      )
      .pipe(
        mergeMap((result) => {
          return result.data.map((point: Point) => {
            return this.locationService
              .getCoordsByAddress(`${point.cityId.name}, ${point.address}`)
              .pipe(
                map((coords) => {
                  point.coords = coords;
                  return point;
                })
              );
          });
        }),
        combineAll()
      );
  }
}
