import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CarService } from '../../../../shared/services/car.service';
import { Observable } from 'rxjs';
import { Car, CarCategory } from '../../../../shared/interfaces/car';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { carTypeInputs } from './modelTypeInputs';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarModelListComponent implements OnInit, OnDestroy {
  @Input() carModelForm: AbstractControl;
  cars: Observable<Car[]>;
  category: CarCategory = 'Все';
  carTypeInputs = carTypeInputs;
  constructor(private carService: CarService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.carModelForm
      .get('carCategory')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.category = value;
      });
  }

  ngOnDestroy(): void {}

  setCar(car: Car): void {
    this.orderService.car.next(car);
  }
}
