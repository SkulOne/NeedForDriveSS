import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order, OrderStatus, RateId } from '../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { LocationService } from './location.service';
import { HttpBackService } from '@shared/services/http-back.service';

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
    private locationService: LocationService,
    private httpBack: HttpBackService
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
    return this.httpBack.getAll<RateId>('rate');
  }

  getOrderStatus(): Observable<OrderStatus> {
    return this.httpBack.getAll<OrderStatus>('orderStatus').pipe(map((result) => result[0]));
  }

  postOrder(order: Order): Observable<string> {
    return this.httpBack.post<Order>('order', order).pipe(
      map((value) => {
        return value.id;
      })
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpBack.get<Order>(`order`, id).pipe(
      map((result) => {
        const car = result.carId;
        car.thumbnail.path = car.thumbnail.path.search('data:image/png;base64,')
          ? `http://api-factory.simbirsoft1.com${car.thumbnail.path}`
          : car.thumbnail.path;
        return result;
      })
    );
  }

  cancelOrder(order: Order): Observable<Order> {
    order.orderStatusId.id = this.cancelledId;
    return this.httpBack.put<Order>('order', order);
  }
}
