import { City } from './city';
import { Point } from './point';
import { Car } from '@shared/classes/car';

export interface Order {
  id?: string;
  orderStatusId?: OrderStatus;
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

export interface OrderStatus {
  name: OrderStatusName;
  id: string;
}
export type OrderStatusName = 'new' | 'issued' | 'confirmed' | 'cancelled';
