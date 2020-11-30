import { InputCheckedElement, TextInput } from '../../../../shared/interfaces/input';
import { AdditionallyService } from './additionally-service';

export const additionalInputs: InputCheckedElement[] = [
  {
    id: 'isFullTank',
    value: {
      name: 'Полный бак',
      price: 500,
      unit: 'Р',
    } as AdditionallyService,
    labelValue: 'Полный бак, 500р',
  },
  {
    id: 'isNeedChildChair',
    value: {
      name: 'Детское кресло',
      price: 200,
      unit: 'Р',
    } as AdditionallyService,
    labelValue: 'Детское кресло, 200р',
  },
  {
    id: 'isRightWheel',
    value: {
      name: 'Првый руль',
      price: 1600,
      unit: 'Р',
    } as AdditionallyService,
    labelValue: 'Правый руль, 1600р',
  },
];
export const dateInput: TextInput[] = [
  { label: 'C', controlName: 'dateFrom', matLabel: 'Дата начала аренды' },
  { label: 'По', controlName: 'dateTo', matLabel: 'Дата конца аренды' },
];
