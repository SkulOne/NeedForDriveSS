import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RateId } from '../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../interfaces/response-result';
import { httpOptions } from '../const';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  stepperIndex = new Subject<number>();

  orderBehavior = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) {}

  getRates(): Observable<RateId[]> {
    return this.httpClient.get<ResponseResult<RateId>>('api/db/rate', httpOptions).pipe(
      catchError((err) => this.errorHandler.handleError(err)),
      map((value) => value.data)
    );
  }
}
