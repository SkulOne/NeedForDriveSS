import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order, OrderStatus, RateId } from '../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from '../interfaces/response-result';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  nextStepBtnTrigger = new Subject();

  private _orderBehavior = new BehaviorSubject(null);
  private _stepperIndex: number;
  private readonly cancelledId = '5e26a1f5099b810b946c5d8c';

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
    private locationService: LocationService
  ) {}
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
    this.locationService.setCity$.next(value && value.cityId ? value.cityId : null);
    this._orderBehavior.next(value);
  }

  getRates(): Observable<RateId[]> {
    return this.httpClient.get<ResponseResult<RateId[]>>('api/db/rate').pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((value) => value.data)
    );
  }

  getOrderStatus(): Observable<OrderStatus> {
    return this.httpClient
      .get<ResponseResult<OrderStatus[]>>('api/db/orderStatus')
      .pipe(map((result) => result.data[0]));
  }

  postOrder(order: Order): Observable<string> {
    return this.httpClient.post<ResponseResult<Order>>('api/db/order', order).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((value) => {
        return value.data.id;
      })
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient.get<ResponseResult<Order>>(`api/db/order/${id}`).pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      map((result) => {
        const car = result.data.carId;
        car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
          ? `http://api-factory.simbirsoft1.com${car.thumbnail.path}`
          : car.thumbnail.path;
        return result.data;
      })
    );
  }

  cancelOrder(order: Order): Observable<Order> {
    order.orderStatusId.id = this.cancelledId;
    return this.httpClient.put<Order>(`api/db/order/${order.id}`, order);
  }
}
