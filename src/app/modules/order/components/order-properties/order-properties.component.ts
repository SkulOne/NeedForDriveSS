import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { LeaseDuration } from '../../../../shared/interfaces/lease-duration';
import { Order } from '../../../../shared/interfaces/order';
import { getDifferenceDays } from '../../../../shared/utils';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent {
  leaseDuration: LeaseDuration;
  buttonContent = 'Выбрать модель';

  private _order: Order;

  constructor(private orderService: OrderService) {}

  get order(): Order {
    return this._order;
  }

  @Input() set order(value: Order) {
    this._order = value;
    if (this.order) {
      if (this.order.carId) {
        this.buttonContent = 'Дополнительно';
      }
      if (this.order.dateFrom) {
        this.leaseDuration = getDifferenceDays(this.order.dateFrom, this.order.dateTo);
      }
      if (this.order.price) {
        this.buttonContent = 'Итого';
      }
    }
  }

  nextStep(): void {
    this.orderService.nextStepBtnTrigger.next();
  }
}
