import { SidenavListItem } from '@shared/interfaces/sidenav-list-item';

export const listItems: SidenavListItem[] = [
  {
    icon: 'create',
    textContent: 'Карточка автомобиля',
    routerLink: '/admin/edit/car',
  },
  {
    icon: 'vertical_split',
    textContent: 'Список авто',
    routerLink: '/admin/list/car',
  },
  {
    icon: 'view_module',
    textContent: 'Категории',
    routerLink: '/admin/category',
  },
  {
    icon: 'view_column',
    textContent: 'Города',
    routerLink: '/admin/city',
  },
  {
    icon: 'person',
    textContent: 'Точки выдачи',
    routerLink: '/admin/point',
  },
  {
    icon: 'error',
    textContent: 'Rate',
    routerLink: '/admin/rate',
  },
  {
    icon: 'note_add',
    textContent: 'RateType',
    routerLink: '/admin/rateType',
  },
];
