import { TableHeader } from '@shared/interfaces/table-header';
import { SelectControlEntity, TextInput } from '@shared/interfaces/input';

export const inputs: EntityInputs = {
  category: {
    tableHeaders: [
      { text: 'Название', matColumnDef: 'name' },
      { text: 'Описание', matColumnDef: 'description' },
    ],
    inputs: [
      { controlName: 'name', matLabel: 'Название' },
      { controlName: 'description', matLabel: 'Описание' },
    ],
  },

  city: {
    tableHeaders: [{ text: 'Город', matColumnDef: 'name' }],
    inputs: [{ controlName: 'name', matLabel: 'Город' }],
  },

  point: {
    tableHeaders: [
      { text: 'Название', matColumnDef: 'name' },
      { text: 'Город', matColumnDef: 'cityId', property: ['cityId', 'name'] },
      { text: 'Адрес', matColumnDef: 'address' },
    ],
    inputs: [
      { controlName: 'name', matLabel: 'Название' },
      { controlName: 'cityId', matLabel: 'Город', dataName: 'city' },
      { controlName: 'address', matLabel: 'Адрес' },
    ],
  },

  rate: {
    tableHeaders: [
      { text: 'Тип', matColumnDef: 'rateTypeId', property: ['rateTypeId', 'name'] },
      { text: 'Цена', matColumnDef: 'price' },
    ],
    inputs: [
      { controlName: 'rateTypeId', matLabel: 'Тип', dataName: 'rateType' },
      { controlName: 'price', matLabel: 'Цена' },
    ],
  },

  rateType: {
    tableHeaders: [
      { text: 'Единица', matColumnDef: 'unit' },
      { text: 'Название', matColumnDef: 'name' },
    ],
    inputs: [
      { controlName: 'unit', matLabel: 'Единица' },
      { controlName: 'name', matLabel: 'Название' },
    ],
  },
  // todo Вот это всё можно было бы генерить автоматически, если б не russian worlds
  car: {
    tableHeaders: [
      { text: 'Модель', matColumnDef: 'name' },
      { text: 'Мин. цена', matColumnDef: 'priceMin' },
      { text: 'Макс. цена', matColumnDef: 'priceMax' },
      { text: 'Описание', matColumnDef: 'description' },
      { text: 'Номер', matColumnDef: 'number' },
      { text: 'Бензин', matColumnDef: 'tank' },
      { text: 'Категория', matColumnDef: 'categoryId', property: ['name', 'description'] },
    ],
    inputs: [
      { matLabel: 'Модель', controlName: 'name' },
      { matLabel: 'Мин. цена', controlName: 'priceMin' },
      { matLabel: 'Макс. цена', controlName: 'priceMax' },
      { matLabel: 'Описание', controlName: 'description' },
      { matLabel: 'Номер', controlName: 'number' },
      { matLabel: 'Бензин', controlName: 'tank' },
      { matLabel: 'Категория', controlName: 'categoryId' },
    ],
  },
};

// todo: Вынеси да э па братски
export interface EntityInputs {
  [key: string]: {
    tableHeaders: TableHeader[];
    inputs: EntityInput[];
  };
}

type EntityInput = TextInput | SelectControlEntity;
