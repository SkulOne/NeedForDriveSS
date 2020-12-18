import { City } from './city';
import { ICar } from './ICar';
import { Point } from './point';

export interface Order {
  id?: string;
  orderStatusId?: OrderStatus;
  cityId?: City;
  pointId?: Point;
  carId?: ICar;
  color: string;
  dateFrom?: number;
  dateTo?: number;
  rateId?: RateId;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface RateId {
  rateTypeId: RateTypeID;
  price: number;
}

export type RateTypeID = { unit: 'мин'; name: 'Поминутно' } | { unit: 'сутки'; name: 'На сутки' };

export interface OrderStatus {
  name: OrderStatusName;
  id: string;
}
export type OrderStatusName = 'new' | 'issued' | 'confirmed' | 'cancelled';
