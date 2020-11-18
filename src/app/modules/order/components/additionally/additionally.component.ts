import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputCheckedElement, TextInput } from '../../../../shared/interfaces/input';
import { IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-additionally',
  templateUrl: './additionally.component.html',
  styleUrls: ['./additionally.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionallyComponent {
  @Input() additionallyForm: AbstractControl;
  maskedVisible = false;

  colorInputs: InputCheckedElement[] = [
    { id: 'any', value: 'Любой', labelValue: 'Любой' },
    { id: 'Red', value: 'Красный', labelValue: 'Красный' },
    { id: 'Blue', value: 'Синий', labelValue: 'Синий' },
  ];
  serviceInputs: InputCheckedElement[] = [
    { id: 'minute', value: 'поминутно', labelValue: 'Поминутно, 7Р/мин' },
    { id: 'day', value: 'суточно', labelValue: 'На стуки, 1999Р/сутки' },
  ];
  additionalInputs: InputCheckedElement[] = [
    { id: 'tank', value: 'бак', labelValue: 'Полный бак, 500р' },
    { id: 'armchair', value: 'кресло', labelValue: 'Детское кресло, 200р' },
    { id: 'right', value: 'праворульный', labelValue: 'Правый руль, 1600р' },
  ];
  dateInput: TextInput[] = [
    { label: 'C', controlName: 'startDate', matLabel: 'Дата начала аренды' },
    { label: 'По', controlName: 'endDate', matLabel: 'Дата конца аренды' },
  ];
  datePickerConfig: IDatePickerConfig = {
    format: 'DD.MM.YYYY, HH:mm',
    firstDayOfWeek: 'mo',
    showTwentyFourHours: true,
    disableKeypress: true,
  };
  constructor() {}
}
