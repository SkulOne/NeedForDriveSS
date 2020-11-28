import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CarService } from '../../../../shared/services/car.service';
import { Observable } from 'rxjs';
import { Car, CarCategory } from '../../../../shared/interfaces/car';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { carTypeInputs } from './modelTypeInputs';
import { OrderService } from '../../../../shared/services/order.service';
import { take } from 'rxjs/operators';
import { Order } from '../../../../shared/interfaces/order';
import { AbstractOrderStepperChild } from '../../../../shared/abstract-order-stepper-child';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarModelListComponent extends AbstractOrderStepperChild implements OnInit, OnDestroy {
  @Input() carModelForm: AbstractControl;
  cars: Observable<Car[]>;
  category: Observable<CarCategory>;
  carTypeInputs = carTypeInputs;
  constructor(private carService: CarService, private orderService: OrderService) {
    super(orderService);
  }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.category = this.carModelForm.get('carCategory').valueChanges;
  }

  ngOnDestroy(): void {}

  setCar(car: Car): void {
    this.orderService.orderBehavior
      .asObservable()
      .pipe(take(1), untilDestroyed(this))
      .subscribe((value: Order) => {
        this.reset(this.carModelForm, ['pointId', 'carId', 'color']);
        value.carId = car;
        value.color = 'Любой';
        this.orderService.orderBehavior.next(value);
      });
  }
}
