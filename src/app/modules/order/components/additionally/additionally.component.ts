import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { additionalInputs, dateInput } from './additionnallyInputs';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { isAfterDate } from '../../../../shared/validators';
import { errors } from './additionallyErrors';
import { createDate, getDifferenceDays } from '../../../../shared/utils';
import { Order, RateId } from '../../../../shared/interfaces/order';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionallyComponent implements OnInit, OnDestroy {
  additionalInputs = additionalInputs;
  additionalServices: AbstractControl;
  carColors: Observable<string[]>;
  dateInput = dateInput;
  dateToControl: AbstractControl;
  errors = errors;
  maskedVisible = false;
  dateFromControl: AbstractControl;
  rateIdArray: Observable<RateId[]>;
  rateIdControl: AbstractControl;

  private _additionallyForm: AbstractControl;

  constructor(private orderService: OrderService) {}

  get additionallyForm(): AbstractControl {
    return this._additionallyForm as FormControl;
  }

  @Input() set additionallyForm(form: AbstractControl) {
    this.dateFromControl = form.get('dateFrom');
    this.dateToControl = form.get('dateTo');
    this.rateIdControl = form.get('rateId');
    this._additionallyForm = form;
  }

  formError(formControlName: string, error: string): ValidationErrors | null {
    return this.additionallyForm.get(formControlName).errors?.[error];
  }

  ngOnInit(): void {
    this.rateIdArray = this.orderService.getRates();

    this.dateToControl.setValidators(isAfterDate(this.dateFromControl));

    this.carColors = this.orderService.orderBehavior
      .asObservable()
      .pipe(map((order: Order) => (order.carId ? order.carId.colors : null)));

    this.onFormChange();
  }

  ngOnDestroy(): void {}

  private onFormChange(): void {
    this.additionallyForm.valueChanges
      .pipe(
        switchMap(() => this.orderService.orderBehavior.asObservable().pipe(take(1))),
        untilDestroyed(this)
      )
      .subscribe((order: Order) => {
        order.isNeedChildChair = this.additionallyForm.get('isNeedChildChair').value;
        order.isRightWheel = this.additionallyForm.get('isRightWheel').value;
        order.isFullTank = this.additionallyForm.get('isFullTank').value;
        order.rateId = this.rateIdControl.value;
        order.color = this.additionallyForm.get('color').value;
        this.setDate(order);
        this.setPrice(order);

        this.orderService.orderBehavior.next(order);
      });
  }

  private setDate(order: Order): void {
    if (this.additionallyForm.get('dateTo').valid) {
      order.dateFrom = +createDate(this.dateFromControl.value);
      order.dateTo = +createDate(this.dateToControl.value);
    }
  }

  private setPrice(order: Order): void {
    if (this.rateIdControl.valid && this.dateToControl.valid && this.rateIdControl.value) {
      if ((this.rateIdControl.value as RateId).rateTypeId.name === 'На сутки') {
        const lease = getDifferenceDays(order.dateFrom, order.dateTo);
        order.price = (this.rateIdControl.value as RateId).price * lease.day;
      } else {
        const leaseMin = (order.dateTo - order.dateFrom) / (1000 * 60);
        order.price = (this.rateIdControl.value as RateId).price * leaseMin;
      }
    }
    if (order.isFullTank) {
      order.price += 500;
    } else if (order.price !== 0) {
      order.price -= 500;
    }
    if (order.isRightWheel) {
      order.price += 1600;
    } else if (order.price !== 0) {
      order.price -= 1600;
    }
    if (order.isNeedChildChair) {
      order.price += 200;
    } else if (order.price !== 0) {
      order.price -= 200;
    }
  }
}
