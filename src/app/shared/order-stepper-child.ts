import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Order } from './interfaces/order';
import { OrderService } from './services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, Subscription } from 'rxjs';

export abstract class OrderStepperChild {
  private _currentIndex: number;
  private _form: AbstractControl | FormGroup;
  private _parentControllers: AbstractControl[];

  protected constructor(private service: OrderService) {}

  get form(): AbstractControl | FormGroup {
    return this._form;
  }

  set form(value: AbstractControl | FormGroup) {
    this._form = value;
    this._parentControllers = this.getParentControllers(value);
    this._currentIndex = this._parentControllers.indexOf(value);
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  reset(orderProperties: string[]): Subscription {
    this.resetNextFormGroups();
    return this.resetExcept(orderProperties);
  }

  formError(formControlName: string, error: string): ValidationErrors | null {
    return this.form.get(formControlName).errors?.[error];
  }

  protected getOrderObservable(): Observable<Order> {
    return this.service.order.pipe(take(1), untilDestroyed(this));
  }

  private getParentControllers(formGroup: AbstractControl): AbstractControl[] {
    const parentControlsKeyValueArray = Object.entries(formGroup.parent.controls);
    return parentControlsKeyValueArray.map((value) => value[1]);
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

  private resetNextFormGroups(): void {
    const controlsNeedReset = this._parentControllers.slice(this.currentIndex + 1);
    controlsNeedReset.forEach((control) => {
      control.reset();
    });
  }
}
