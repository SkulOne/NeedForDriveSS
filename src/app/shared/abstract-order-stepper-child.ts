import { AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Order } from './interfaces/order';
import { OrderService } from './services/order.service';
import { OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

export abstract class AbstractOrderStepperChild implements OnDestroy {
  protected constructor(private service: OrderService) {}

  reset(formGroup: AbstractControl, orderProperties: string[]): void {
    this.resetNextFormGroups(formGroup);
    this.resetExcept(orderProperties);
  }

  ngOnDestroy(): void {}

  private resetExcept(except: string[]): void {
    this.service.orderBehavior
      .asObservable()
      .pipe(take(1), untilDestroyed(this))
      .subscribe((order: Order) => {
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
      });
  }

  private resetNextFormGroups(formGroup: AbstractControl): void {
    const parentControlsKeyValueArray = Object.entries(formGroup.parent.controls);
    const parentControlsArray = parentControlsKeyValueArray.map((value) => value[1]);
    const startIndex = parentControlsArray.indexOf(formGroup) + 1;
    const controlsNeedReset = parentControlsArray.slice(startIndex + 1);
    controlsNeedReset.forEach((control) => control.reset());
  }
}
