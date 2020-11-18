import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CarService } from '../../../../shared/services/car.service';
import { Observable } from 'rxjs';
import { Car, CarCategory } from '../../../../shared/interfaces/car';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { InputCheckedElement } from '../../../../shared/interfaces/input';

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
  carTypeInputs: InputCheckedElement[] = [
    { id: 'all', value: 'Все', labelValue: 'Все модели' },
    { id: 'economy', value: 'Эконом', labelValue: 'Эконом' },
    { id: 'premium', value: 'Премиум', labelValue: 'Премиум' },
  ];

  constructor(private carService: CarService) {}

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
}
