import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-date-picker';
import { colorInputs, dateInput, serviceInputs, additionalInputs } from './additionnallyInputs';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionallyComponent {
  @Input() additionallyForm: AbstractControl;
  maskedVisible = false;

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
  constructor() {}
}
