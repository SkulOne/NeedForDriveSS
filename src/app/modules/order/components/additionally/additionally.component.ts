import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { additionalInputs, dateInput } from './additionnallyInputs';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { errors } from './additionallyErrors';
import { createDate, getDifferenceDays } from '../../../../shared/utils';
import { Order, RateId } from '../../../../shared/interfaces/order';
import { Observable, Subscription } from 'rxjs';
import { OrderStepperChild } from '../../../../shared/order-stepper-child';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionallyComponent extends OrderStepperChild implements OnInit, OnDestroy {
  additionalInputs = additionalInputs;
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
  private subscription: Subscription;
  constructor(private orderService: OrderService, private errorService: ErrorHandlerService) {
    super(orderService);
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

    this.orderService.order.pipe(untilDestroyed(this)).subscribe((order) => {
      if (order.color === 'Любой') {
        this.colorControl.setValue('Любой');
      }
      if (order.carId) {
        this.carColors = order.carId.colors;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setAdditionallyService(id: string, price: number): void {
    this.getOrderObservable().subscribe((order) => {
      if (this.additionalServices.get(id).value != null) {
        if (this.additionalServices.get(id).value) {
          order[id] = true;
          order.price += price;
        } else {
          order[id] = false;
          order.price -= price;
        }
        this.orderService.orderTrigger(order);
        this.checkRange(order);
      }
    });
  }

  setRate(value: RateId): void {
    this.getOrderObservable().subscribe((order: Order) => {
      order.rateId = value;
      this.setPrice(order);
      this.orderService.orderTrigger(order);
    });
  }

  setDate(value: string, controlName: string): void {
    if (this.form.get('dateTo').valid) {
      this.getOrderObservable().subscribe((order: Order) => {
        order[controlName] = +createDate(value);
        this.rateIdControl.reset();
        this.orderService.orderTrigger(order);
      });
    }
  }

  setColor(value: string): void {
    this.getOrderObservable().subscribe((order) => {
      order.color = value;
      this.orderService.orderTrigger(order);
    });
  }

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

  private setPrice(order: Order): void {
    if (this.rateIdControl.valid && this.dateToControl.valid && this.rateIdControl.value) {
      this.additionalServices.reset();
      if ((this.rateIdControl.value as RateId).rateTypeId.name === 'На сутки') {
        const lease = getDifferenceDays(order.dateFrom, order.dateTo);
        order.price = (this.rateIdControl.value as RateId).price * lease.day;
      } else {
        const leaseMin = (order.dateTo - order.dateFrom) / (1000 * 60);
        order.price = (this.rateIdControl.value as RateId).price * leaseMin;
      }
      this.orderService.stepperIndex = this.currentIndex;
      this.checkRange(order);
    }
  }
}
