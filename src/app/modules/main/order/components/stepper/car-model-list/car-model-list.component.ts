import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CarService } from '@shared/services/car.service';
import { Observable } from 'rxjs';
import { ICar } from '@shared/interfaces/ICar';
import { carTypeInputsArray } from './model-type-inputs';
import { OrderService } from '@shared/services/order.service';
import { Order } from '@shared/interfaces/order';
import { OrderStepperChildDirective } from '@shared/classes/order-stepper-child';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarModelListComponent extends OrderStepperChildDirective implements OnInit {
  cars: Observable<ICar[]>;
  category: Observable<string>;
  carTypeInputs = carTypeInputsArray;
  carCategory: FormControl;
  @Input() order: Order;

  constructor(private carService: CarService, private orderService: OrderService) {
    super();
  }
  @Input() set carModelForm(value: AbstractControl | FormGroup) {
    this.form = value;
  }

  ngOnInit(): void {
    this.cars = this.carService.getAll();
    this.carCategory = new FormControl('Все');
    this.category = this.carCategory.valueChanges;
    this.form.get('carModel').valueChanges.subscribe((value) => {
      this.setCar(value);
    });
  }

  private setCar(car: ICar): void {
    this.order = this.reset(this.order, ['pointId', 'carId', 'color', 'cityId']);
    this.order.carId = car;
    this.order.color = 'Любой';
    this.orderService.stepperIndex = this.currentIndex;
    this.orderService.orderTrigger(this.order);
  }
}
