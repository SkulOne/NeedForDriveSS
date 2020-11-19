import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point } from '../interfaces/point';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  point = new Subject<Point>();
  car = new Subject<Car>();
  stepperIndex = new Subject<number>();
  constructor() {}
}
