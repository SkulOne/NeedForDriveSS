import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Order } from '../../../../../shared/interfaces/order';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInfoComponent {
  private _order: Order;
  constructor() {}
  get order(): Order {
    return this._order;
  }
  @Input() set order(value: Order) {
    this._order = value;
  }
}
