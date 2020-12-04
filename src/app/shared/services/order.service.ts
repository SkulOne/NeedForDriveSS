import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order, RateId } from '../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../interfaces/response-result';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  nextStepBtnTrigger = new Subject();

  private _orderBehavior = new BehaviorSubject(null);
  private _stepperIndex: number;

  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandlerService) {}
  get order(): Observable<Order> {
    return this._orderBehavior.asObservable();
  }
  get stepperIndex(): number {
    return this._stepperIndex;
  }

  set stepperIndex(value: number) {
    this._stepperIndex = value;
  }

  orderTrigger(value: Order): void {
    this._orderBehavior.next(value);
  }

  getRates(): Observable<RateId[]> {
    return this.httpClient.get<ResponseResult<RateId[]>>('api/db/rate').pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((value) => value.data)
    );
  }

  postOrder(order: Order): Observable<string> {
    return this.httpClient.post<ResponseResult<Order>>('api/db/order', order).pipe(
      map((value) => {
        return value.data.id;
      })
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient.get<ResponseResult<Order>>(`api/db/order/${id}`).pipe(
      map((result) => {
        const car = result.data.carId;
        car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
          ? `http://api-factory.simbirsoft1.com${car.thumbnail.path}`
          : car.thumbnail.path;
        return result.data;
      })
    );
  }
}
