import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { additionalInputsArray, dateInput } from './additionnally-inputs';
import { OrderService } from '../../../../../shared/services/order.service';
import { errors } from './additionally-errors';
import { createDate, getDifferenceDays } from '../../../../../shared/utils';
import { Order, RateId } from '../../../../../shared/interfaces/order';
import { Observable } from 'rxjs';
import { OrderStepperChildDirective } from '../../../../../shared/order-stepper-child';
import { ErrorHandlerService } from '../../../../../shared/services/error-handler.service';
import { map, pairwise } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionallyComponent extends OrderStepperChildDirective implements OnInit, OnDestroy {
  additionalInputs = additionalInputsArray;
  additionalServices: AbstractControl | FormGroup;
  carColors: string[];
  colorControl: FormControl;
  dateInput = dateInput;
  dateToControl: AbstractControl | FormControl;
  errors = errors;
  maskedVisible = false;
  dateFromControl: AbstractControl | FormControl;
  rateIdArray: Observable<RateId[]>;
  rateIdControl: AbstractControl | FormControl;

  private _order: Order;
  constructor(private orderService: OrderService, private errorService: ErrorHandlerService) {
    super();
  }
  get order(): Order {
    return this._order;
  }

  @Input() set order(value: Order) {
    if (value.carId) {
      this.carColors = value.carId.colors;
      this.setColor(value.color);
    }
    this._order = value;
  }

  @Input() set additionallyForm(form: FormGroup | AbstractControl) {
    this.dateFromControl = form.get('dateFrom');
    this.dateToControl = form.get('dateTo');
    this.rateIdControl = form.get('rateId');
    this.additionalServices = form.get('additionallyServices');
    this.form = form;
  }

  ngOnInit(): void {
    this.rateIdArray = this.orderService.getRates();

    this.colorControl = new FormControl('Любой');

    this.colorControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      if (value) {
        this.order.color = value;
        this.orderService.orderTrigger(this.order);
      }
    });

    this.dateToControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.setDate(value, 'dateTo');
    });

    this.dateFromControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.setDate(value, 'dateFrom');
    });

    this.rateIdControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.setRate(value);
    });

    this.additionalServices.valueChanges
      .pipe(
        pairwise(),
        map(([prev, curr]) => Object.keys(curr).find((key) => prev[key] !== curr[key])),
        untilDestroyed(this)
      )
      .subscribe((value) => {
        switch (value) {
          case 'isFullTank':
            this.setAdditionallyService('isFullTank', 500);
            break;
          case 'isNeedChildChair':
            this.setAdditionallyService('isNeedChildChair', 200);
            break;
          case 'isRightWheel':
            this.setAdditionallyService('isRightWheel', 1600);
            break;
        }
      });
  }

  ngOnDestroy(): void {}

  checkRange(order: Order): void {
    if (order.carId) {
      if (order.carId.priceMin > order.price || order.price > order.carId.priceMax) {
        this.errorService.userError(
          `Стоимость аренды должна быть больше ${order.carId.priceMin}₽ и меньше ${order.carId.priceMax}₽.
          Измените дату, тариф или выберите дополнительные услуги.
          Текущая стоимость - ${order.price}₽`
        );
        this.rateIdControl.reset();
        order.price = 0;
      }
    }
  }

  private setColor(value: string): void {
    if (value === 'Любой' && !value) {
      this.colorControl.setValue('Любой');
    } else {
      this.colorControl.setValue(value);
    }
  }

  private setRate(value: RateId): void {
    if (value) {
      this.order.rateId = value;
      this.setPrice();
      this.orderService.orderTrigger(this.order);
    }
  }

  private setAdditionallyService(property: string, price: number): void {
    if (this.additionalServices.get(property).value && price) {
      this.order[property] = true;
      this.order.price += price;
    } else {
      this.order[property] = false;
      this.order.price -= price;
    }
    this.orderService.orderTrigger(this.order);
    this.checkRange(this.order);
  }

  private setDate(value: string, controlName: string): void {
    if (this.form.get(controlName).valid && value) {
      this.order[controlName] = +createDate(value);
      this.rateIdControl.reset();
      this.order = this.reset(this.order, [
        'pointId',
        'carId',
        'color',
        'cityId',
        'dateTo',
        'dateFrom',
      ]);
      this.orderService.orderTrigger(this.order);
    } else {
      this.form.get(controlName).setErrors(null);
    }
  }

  private setPrice(): void {
    if (
      this.rateIdControl.valid &&
      this.dateToControl.valid &&
      this.dateToControl.value &&
      this.rateIdControl.value
    ) {
      this.additionalServices.reset();
      if ((this.rateIdControl.value as RateId).rateTypeId.name === 'На сутки') {
        const lease = getDifferenceDays(this.order.dateFrom, this.order.dateTo);
        this.order.price = (this.rateIdControl.value as RateId).price * lease.day;
      } else {
        const leaseMin = (this.order.dateTo - this.order.dateFrom) / (1000 * 60);
        this.order.price = (this.rateIdControl.value as RateId).price * leaseMin;
      }
      this.orderService.stepperIndex = this.currentIndex;
      this.checkRange(this.order);
    }
  }
}
