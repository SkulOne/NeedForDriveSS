import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { additionalInputs, dateInput } from './additionnallyInputs';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { errors } from './additionallyErrors';
import { createDate, getDifferenceDays } from '../../../../shared/utils';
import { Order, RateId } from '../../../../shared/interfaces/order';
import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { OrderStepperChild } from '../../../../shared/order-stepper-child.component';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionallyComponent extends OrderStepperChild implements OnInit, OnDestroy {
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
  @Output() formChanged = new EventEmitter<string>();
  private _additionallyForm: AbstractControl;
  private subscription: Subscription;
  constructor(private orderService: OrderService) {
    super(orderService);
  }

  get additionallyForm(): AbstractControl {
    return this._additionallyForm as FormGroup;
  }

  @Input() set additionallyForm(form: AbstractControl) {
    this.dateFromControl = form.get('dateFrom');
    this.dateToControl = form.get('dateTo');
    this.rateIdControl = form.get('rateId');
    this.additionalServices = form.get('additionallyServices');
    this._additionallyForm = form;
  }

  formError(formControlName: string, error: string): ValidationErrors | null {
    return this.additionallyForm.get(formControlName).errors?.[error];
  }

  ngOnInit(): void {
    this.rateIdArray = this.orderService.getRates();

    this.carColors = this.orderService.orderBehavior
      .asObservable()
      .pipe(map((order) => (order.carId ? order.carId.colors : null)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setAdditionallyService(id: string, price: number): void {
    this.getOrderEntity().subscribe((order) => {
      if (this.additionalServices.get(id).value) {
        order[id] = true;
        order.price += price;
      } else {
        order[id] = false;
        order.price -= price;
      }
      this.orderService.orderBehavior.next(order);
    });
  }

  setPrice(): void {
    if (this.rateIdControl.valid && this.dateToControl.valid && this.rateIdControl.value) {
      this.getOrderEntity().subscribe((order) => {
        order.price = 0;
        this.additionalServices.reset();
        if ((this.rateIdControl.value as RateId).rateTypeId.name === 'На сутки') {
          const lease = getDifferenceDays(order.dateFrom, order.dateTo);
          order.price = (this.rateIdControl.value as RateId).price * lease.day;
        } else {
          const leaseMin = (order.dateTo - order.dateFrom) / (1000 * 60);
          order.price = (this.rateIdControl.value as RateId).price * leaseMin;
        }
        this.orderService.orderBehavior.next(order);
      });
    }
  }

  setDate(value: string, controlName: string): void {
    if (this.additionallyForm.get('dateTo').valid) {
      this.getOrderEntity().subscribe((order: Order) => {
        order[controlName] = +createDate(value);
        this.orderService.orderBehavior.next(order);
      });
    }
  }

  setColor(value: string): void {
    this.getOrderEntity().subscribe((order) => {
      order.color = value;
      this.orderService.orderBehavior.next(order);
    });
  }

  private getOrderEntity(): Observable<Order> {
    return this.orderService.orderBehavior.asObservable().pipe(take(1), untilDestroyed(this));
  }
}
