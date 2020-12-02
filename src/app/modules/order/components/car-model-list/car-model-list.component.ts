import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CarService } from '../../../../shared/services/car.service';
import { Observable, Subscription } from 'rxjs';
import { Car, CarCategory } from '../../../../shared/interfaces/car';
import { carTypeInputs } from './modelTypeInputs';
import { OrderService } from '../../../../shared/services/order.service';
import { Order } from '../../../../shared/interfaces/order';
import { OrderStepperChild } from '../../../../shared/order-stepper-child';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarModelListComponent extends OrderStepperChild implements OnInit, OnDestroy {
  cars: Observable<Car[]>;
  category: Observable<CarCategory>;
  carTypeInputs = carTypeInputs;
  carCategory: FormControl;
  private _subscription: Subscription;
  constructor(private carService: CarService, private orderService: OrderService) {
    super(orderService);
  }
  @Input() set carModelForm(value: AbstractControl | FormGroup) {
    this.form = value;
  }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.carCategory = new FormControl('Все');
    this.category = this.carCategory.valueChanges;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  setCar(car: Car): void {
    this.getOrderObservable().subscribe((value: Order) => {
      this._subscription = this.reset(['pointId', 'carId', 'color']);
      value.carId = car;
      value.color = 'Любой';
      this.orderService.stepperIndex = this.currentIndex;
      this.orderService.orderTrigger(value);
    });
  }
}
