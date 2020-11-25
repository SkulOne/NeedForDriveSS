import { City } from './city';
import { Car } from './car';
import { Point } from './point';

export interface Order {
  orderStatusId: OrderStatus;
  cityId?: City;
  pointId?: Point;
  carId?: Car;
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

export type OrderStatus = 'new' | 'issued' | 'confirmed' | 'cancelled';
