import { InputCheckedElement, TextInput } from '../../../../../../shared/interfaces/input';

export const additionalInputsArray: InputCheckedElement[] = [
  {
    id: 'isFullTank',
    value: true,
    labelValue: 'Полный бак, 500р',
  },
  {
    id: 'isNeedChildChair',
    value: true,
    labelValue: 'Детское кресло, 200р',
  },
  {
    id: 'isRightWheel',
    value: true,
    labelValue: 'Правый руль, 1600р',
  },
];
export const dateInput: TextInput[] = [
  { label: 'C', controlName: 'dateFrom', matLabel: 'Дата начала аренды' },
  { label: 'По', controlName: 'dateTo', matLabel: 'Дата конца аренды' },
];
