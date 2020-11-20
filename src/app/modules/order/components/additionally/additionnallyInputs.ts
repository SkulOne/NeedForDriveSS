import { InputCheckedElement, TextInput } from '../../../../shared/interfaces/input';

export const colorInputs: InputCheckedElement[] = [
  { id: 'any', value: 'Любой', labelValue: 'Любой' },
  { id: 'Red', value: 'Красный', labelValue: 'Красный' },
  { id: 'Blue', value: 'Синий', labelValue: 'Синий' },
];
export const serviceInputs: InputCheckedElement[] = [
  { id: 'minute', value: 'мин', labelValue: 'Поминутно, 7Р/мин' },
  { id: 'day', value: 'сутки', labelValue: 'На сутки, 1999Р/сутки' },
];
export const additionalInputs: InputCheckedElement[] = [
  { id: 'tank', value: 'бак', labelValue: 'Полный бак, 500р' },
  { id: 'armchair', value: 'кресло', labelValue: 'Детское кресло, 200р' },
  { id: 'right', value: 'праворульный', labelValue: 'Правый руль, 1600р' },
];
export const dateInput: TextInput[] = [
  { label: 'C', controlName: 'startDate', matLabel: 'Дата начала аренды' },
  { label: 'По', controlName: 'endDate', matLabel: 'Дата конца аренды' },
];
