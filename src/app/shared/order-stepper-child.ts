import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Order } from './interfaces/order';
import { OrderService } from './services/order.service';

export abstract class OrderStepperChildDirective {
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

  reset(order: Order, orderProperties: string[]): void {
    this.resetNextFormGroups();
    this.resetExcept(order, orderProperties);
  }

  formError(formControlName: string, error: string): ValidationErrors | null {
    return this.form.get(formControlName).errors?.[error];
  }

  private getParentControllers(formGroup: AbstractControl): AbstractControl[] {
    const parentControlsKeyValueArray = Object.entries(formGroup.parent.controls);
    return parentControlsKeyValueArray.map((value) => value[1]);
  }

  private resetExcept(order: Order, except: string[]): void {
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
  }

  private resetNextFormGroups(): void {
    const controlsNeedReset = this._parentControllers.slice(this.currentIndex + 1);
    controlsNeedReset.forEach((control) => {
      control.reset();
    });
  }
}
