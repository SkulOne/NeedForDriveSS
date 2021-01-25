import { EntityInputs } from '@shared/interfaces/entity-inputs';
import { InputType } from '@shared/interfaces/table-header';

export const inputs: EntityInputs = {
  category: {
    properties: [
      { type: InputType.Text, text: 'Название', matColumnDef: 'name' },
      { type: InputType.Text, text: 'Описание', matColumnDef: 'description' },
    ],
  },

  city: {
    properties: [{ type: InputType.Text, text: 'Город', matColumnDef: 'name' }],
  },

  point: {
    properties: [
      { type: InputType.Text, text: 'Название', matColumnDef: 'name' },
      { type: InputType.Object, text: 'Город', matColumnDef: 'cityId', property: ['name'] },
      { type: InputType.Text, text: 'Адрес', matColumnDef: 'address' },
    ],
  },

  rate: {
    properties: [
      { type: InputType.Object, text: 'Тип', matColumnDef: 'rateTypeId', property: ['name'] },
      { type: InputType.Number, text: 'Цена', matColumnDef: 'price' },
    ],
  },

  rateType: {
    properties: [
      { type: InputType.Text, text: 'Единица', matColumnDef: 'unit' },
      { type: InputType.Text, text: 'Название', matColumnDef: 'name' },
    ],
  },
  car: {
    properties: [
      { type: InputType.Text, text: 'Модель', matColumnDef: 'name' },
      { type: InputType.Number, text: 'Мин. цена', matColumnDef: 'priceMin' },
      { type: InputType.Number, text: 'Макс. цена', matColumnDef: 'priceMax' },
      { type: InputType.Text, text: 'Номер', matColumnDef: 'number' },
      { type: InputType.Text, text: 'Бензин', matColumnDef: 'tank' },
      { type: InputType.Object, text: 'Категория', matColumnDef: 'categoryId', property: ['name'] },
    ],
  },
  order: {
    properties: [
      {
        type: InputType.Object,
        text: 'Статус заказа',
        matColumnDef: 'orderStatusId',
        property: ['name'],
      },
      { type: InputType.Object, text: 'Город', matColumnDef: 'cityId', property: ['name'] },
      { type: InputType.Object, text: 'Точка выдачи', matColumnDef: 'pointId', property: ['name'] },
      { type: InputType.Object, text: 'Модель', matColumnDef: 'carId', property: ['name'] },
      { type: InputType.Text, text: 'Цвет', matColumnDef: 'color' },
      { type: InputType.Date, text: 'С', matColumnDef: 'dateFrom' },
      { type: InputType.Date, text: 'По', matColumnDef: 'dateTo' },
      {
        type: InputType.Object,
        text: 'Тип',
        matColumnDef: 'rateId',
        property: ['rateTypeId', 'name'],
      },
      { type: InputType.Number, text: 'Цена', matColumnDef: 'price' },
      { type: InputType.Boolean, text: 'Полный бак', matColumnDef: 'isFullTank' },
      { type: InputType.Boolean, text: 'Детское кресло', matColumnDef: 'isNeedChildChair' },
      { type: InputType.Boolean, text: 'Правый руль', matColumnDef: 'isRightWheel' },
    ],
  },
};
