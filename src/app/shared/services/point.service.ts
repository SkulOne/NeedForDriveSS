import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, combineAll, map, mergeMap } from 'rxjs/operators';
import { ResponseResult } from '../interfaces/response-result';
import { Observable } from 'rxjs';
import { Point } from '../interfaces/point';
import { LocationService } from './location.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  constructor(
    private httpClient: HttpClient,
    private locationService: LocationService,
    private errorHandler: ErrorHandlerService
  ) {}

  getPointsFormCity(cityId: string): Observable<Point[]> {
    return this.httpClient.get<ResponseResult<Point[]>>(`api/db/point?cityId=${cityId}`).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
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
