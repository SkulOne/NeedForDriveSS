import { InputCheckedElement, TextInput } from '../../../../shared/interfaces/input';

export const additionalInputs: InputCheckedElement[] = [
  { id: 'isFullTank', value: '500', labelValue: 'Полный бак, 500р' },
  { id: 'isNeedChildChair', value: '200', labelValue: 'Детское кресло, 200р' },
  { id: 'isRightWheel', value: '1600', labelValue: 'Правый руль, 1600р' },
];
export const dateInput: TextInput[] = [
  { label: 'C', controlName: 'dateFrom', matLabel: 'Дата начала аренды' },
  { label: 'По', controlName: 'dateTo', matLabel: 'Дата конца аренды' },
];
