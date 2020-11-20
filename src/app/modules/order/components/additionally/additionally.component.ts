import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-date-picker';
import { colorInputs, dateInput, serviceInputs, additionalInputs } from './additionnallyInputs';
import { OrderService } from '../../../../shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Car } from '../../../../shared/interfaces/car';
import { isAfterDate } from '../../../../shared/validators';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
})
export class AdditionallyComponent implements OnInit, OnDestroy {
  @Input() additionallyForm: AbstractControl;
  maskedVisible = false;

  car: Car;

  colorInputs = colorInputs;
  dateInput = dateInput;
  serviceInputs = serviceInputs;
  additionalInputs = additionalInputs;

  datePickerConfig: IDatePickerConfig = {
    format: 'DD.MM.YYYY, HH:mm',
    firstDayOfWeek: 'mo',
    showTwentyFourHours: true,
    disableKeypress: true,
  };
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.additionallyForm.get('color').valueChanges.subscribe((color) => {
      this.orderService.setOrderProperty('color', color);
    });

    const control = this.additionallyForm.get('startDate');
    this.additionallyForm.get('endDate').setValidators(isAfterDate(control));

    this.orderService.order.pipe(untilDestroyed(this)).subscribe((order) => {
      this.car = order.carId;
    });
  }

  ngOnDestroy(): void {}
}
