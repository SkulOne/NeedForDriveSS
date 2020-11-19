import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Point } from '../../../../shared/interfaces/point';
import { Car } from '../../../../shared/interfaces/car';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent {
  private nextStepIndex = 0;
  get point(): Point {
    return this._point;
  }

  @Input() set point(value: Point) {
    console.log('test');
    this._point = value;
    this.buttonContent = 'Выбрать модель';
    this.nextStepIndex = 1;
  }

  get car(): Car {
    return this._car;
  }

  @Input() set car(value: Car) {
    this._car = value;
    this.buttonContent = 'Дополнительно';
    this.nextStepIndex = 2;
  }

  private _point: Point;
  private _car: Car;
  buttonContent = 'Выбрать модель';

  constructor(private orderService: OrderService) {}

  nextStep(): void {
    this.orderService.stepperIndex.next(this.nextStepIndex);
  }
}
