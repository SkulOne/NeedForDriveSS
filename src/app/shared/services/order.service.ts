import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point } from '../interfaces/point';
import { Car } from '../interfaces/car';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  stepperIndex = new Subject<number>();
  order = new Subject<Order>();

  orderEntity: Order = {
    orderStatusId: 'new',
    color: 'Любой',
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
  };

  constructor() {}

  setOrderProperty(property: string, value: Point | Car | string): void {
    this.orderEntity[property] = value;
    this.order.next(this.orderEntity);
  }
}
