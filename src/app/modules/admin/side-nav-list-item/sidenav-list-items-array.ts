import { SidenavListItem } from './sidenav-list-item';
import { Car } from '@shared/classes/car';
import { City } from '@shared/interfaces/city';
import { Point } from '@shared/interfaces/point';
import { RateId, RateTypeID } from '@shared/interfaces/order';
import { CategoryId } from '@shared/interfaces/category';

export const listItems: SidenavListItem[] = [
  {
    icon: 'create',
    textContent: 'Карточка автомобиля',
    routerLink: '/admin/test/set/car',
    data: new Car(),
  },
  {
    icon: 'vertical_split',
    textContent: 'Список авто',
    routerLink: '/admin/test/get/car',
    data: new Car(),
  },
  {
    icon: 'view_module',
    textContent: 'Категории',
    routerLink: '/admin/test/category',
    data: { name: null, description: null } as CategoryId,
  },
  {
    icon: 'view_column',
    textContent: 'Города',
    routerLink: '/admin/test/city',
    data: { name: null } as City,
  },
  {
    icon: 'person',
    textContent: 'Точки выдачи',
    routerLink: '/admin/test/point',
    data: { address: null, cityId: null, coords: null, name: null } as Point,
  },
  {
    icon: 'error',
    textContent: 'Rate',
    routerLink: '/admin/test/rate',
    data: { rateTypeId: null, price: null } as RateId,
  },
  {
    icon: 'note_add',
    textContent: 'RateType',
    routerLink: '/admin/test/rateType',
    data: { name: null, unit: null } as RateTypeID,
  },
];
