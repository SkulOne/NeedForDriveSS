import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Point} from '../interfaces/point';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  point = new Subject<Point>();

  constructor() {
  }
}
