import { EntityInputs } from '@shared/interfaces/entity-inputs';

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
  car: {
    tableHeaders: [
      { text: 'Модель', matColumnDef: 'name' },
      { text: 'Мин. цена', matColumnDef: 'priceMin' },
      { text: 'Макс. цена', matColumnDef: 'priceMax' },
      { text: 'Номер', matColumnDef: 'number' },
      { text: 'Бензин', matColumnDef: 'tank' },
      { text: 'Категория', matColumnDef: 'categoryId', property: ['categoryId', 'name'] },
    ],
    inputs: [
      { matLabel: 'Модель', controlName: 'name' },
      { matLabel: 'Мин. цена', controlName: 'priceMin' },
      { matLabel: 'Макс. цена', controlName: 'priceMax' },
      { matLabel: 'Номер', controlName: 'number' },
      { matLabel: 'Бензин', controlName: 'tank' },
      { matLabel: 'Категория', controlName: 'categoryId', dataName: 'category' },
    ],
  },
  order: {
    tableHeaders: [
      { text: 'Статус заказа', matColumnDef: 'orderStatusId', property: ['orderStatusId', 'name'] },
      { text: 'Город', matColumnDef: 'cityId', property: ['cityId', 'name'] },
      { text: 'Точка выдачи', matColumnDef: 'pointId', property: ['pointId', 'name'] },
      { text: 'Модель', matColumnDef: 'carId', property: ['carId', 'name'] },
      { text: 'Цвет', matColumnDef: 'color' },
      { text: 'С', matColumnDef: 'dateFrom' },
      { text: 'По', matColumnDef: 'dateTo' },
      { text: 'Тип', matColumnDef: 'rateId', property: ['rateId', 'rateTypeId', 'name'] },
      { text: 'Цена', matColumnDef: 'price' },
      { text: 'Полный бак', matColumnDef: 'isFullTank' },
      { text: 'Детское кресло', matColumnDef: 'isNeedChildChair' },
      { text: 'Правый руль', matColumnDef: 'isRightWheel' },
    ],
    inputs: [
      { matLabel: 'Статус заказа', controlName: 'orderStatusId', dataName: 'orderStatus' },
      { matLabel: 'Город', controlName: 'cityId', dataName: 'city' },
      { matLabel: 'Точка выдачи', controlName: 'pointId', dataName: 'point' },
      { matLabel: 'Модель', controlName: 'carId', dataName: 'car' },
      { matLabel: 'Цвет', controlName: 'color' },
      { matLabel: 'С', controlName: 'dateFrom' },
      { matLabel: 'По', controlName: 'dateTo' },
      { matLabel: 'Тип', controlName: 'rateId', dataName: 'rate' },
      { matLabel: 'Цена', controlName: 'price' },
      { matLabel: 'Полный бак', controlName: 'isFullTank' },
      { matLabel: 'Детское кресло', controlName: 'isNeedChildChair' },
      { matLabel: 'Правый руль', controlName: 'isRightWheel' },
    ],
  },
};
