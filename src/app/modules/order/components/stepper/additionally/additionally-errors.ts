import { ErrorElement } from '@shared/interfaces/error-element';

export const errors: ErrorElement[] = [
  {
    condition: 'mask',
    value: 'Введите корректную дату',
  },
  {
    condition: 'invalidDate',
    value: 'Введите корректную дату',
  },
  {
    condition: 'irrelevantDate',
    value: 'Введите дату не раньше сегодняшей.',
  },
  {
    condition: 'afterDate',
    value: 'Дата начала аренды превышает дату конца аренды.',
  },
  {
    condition: 'enterStartDate',
    value: 'Сначала дату аренды.',
  },
];
