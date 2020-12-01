import { AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Order } from './interfaces/order';
import { OrderService } from './services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, Subscription } from 'rxjs';

export abstract class OrderStepperChild {
  private _currentIndex: number;
  protected constructor(private service: OrderService) {}
  get currentIndex(): number {
    return this._currentIndex;
  }
  setIndex(value: number): void {
    this._currentIndex = value;
    this.service.stepperIndex = value;
  }

  reset(formGroup: AbstractControl, orderProperties: string[]): Subscription {
    this.resetNextFormGroups(formGroup);
    return this.resetExcept(orderProperties);
  }

  protected getOrderObservable(): Observable<Order> {
    return this.service.order.pipe(take(1), untilDestroyed(this));
  }

  private resetExcept(except: string[]): Subscription {
    return this.getOrderObservable().subscribe((order: Order) => {
      const orderKeys = Object.entries(order).map((item) => {
        return item[0];
      });

      const indexes = except.map((value) => {
        if (orderKeys.indexOf(value)) {
          return orderKeys.indexOf(value);
        }
      });

      orderKeys.forEach((value, index) => {
        if (indexes.indexOf(index) === -1) {
          order[value] = null;
        }
      });
      this.service.orderTrigger(order);
    });
  }

  private resetNextFormGroups(formGroup: AbstractControl): void {
    const parentControlsKeyValueArray = Object.entries(formGroup.parent.controls);
    const parentControlsArray = parentControlsKeyValueArray.map((value) => value[1]);
    this.setIndex(parentControlsArray.indexOf(formGroup));
    const controlsNeedReset = parentControlsArray.slice(this.currentIndex + 1);
    controlsNeedReset.forEach((control) => {
      control.reset();
    });
  }
}
