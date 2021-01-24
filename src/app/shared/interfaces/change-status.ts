import { Order } from '@shared/interfaces/order';

export interface ChangeStatus {
  order: Order;
  statusId: string;
}
