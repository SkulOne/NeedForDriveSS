import { SidenavListItem } from './sidenav-list-item';

export const listItems: SidenavListItem[] = [
  {
    icon: 'create',
    textContent: 'Карточка автомобиля',
    routerLink: '/admin/carSetting',
  },
  { icon: 'vertical_split', textContent: 'Список авто', routerLink: '/admin/carList' },
  { icon: 'note_add', textContent: 'Заказы', routerLink: '/admin' },
  { icon: 'view_module', textContent: 'Menu 4', routerLink: '/admin' },
  { icon: 'view_column', textContent: 'Menu 5', routerLink: '/admin' },
  { icon: 'person', textContent: 'Menu 6', routerLink: '/admin' },
  { icon: 'error', textContent: 'Menu 7', routerLink: '/admin' },
];
