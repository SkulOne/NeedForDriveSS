import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { LeaseDuration } from '../../../../../shared/interfaces/lease-duration';
import { Order } from '../../../../../shared/interfaces/order';
import { getDifferenceDays } from '../../../../../shared/utils';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent {
  leaseDuration: LeaseDuration;
  buttonContent = 'Выбрать модель';
  @Input() isReady: boolean;
  @Input() isSent: boolean;
  @Output() orderField = new EventEmitter();
  @Output() nextStepTrigger = new EventEmitter();
  private _order: Order;

  constructor() {}

  get order(): Order {
    return this._order;
  }

  @Input() set order(value: Order) {
    this._order = value;
    if (this.order) {
      if (!this.order.carId && !this.order.price) {
        this.buttonContent = 'Выбрать модель';
      }
      if (this.order.carId && !this.order.price) {
        this.buttonContent = 'Дополнительно';
      }
      if (this.order.dateTo && this.order.dateFrom) {
        this.leaseDuration = getDifferenceDays(this.order.dateFrom, this.order.dateTo);
      }
      if (this.order.carId && this.order.price) {
        this.buttonContent = 'Итого';
      }
    }
  }
}
