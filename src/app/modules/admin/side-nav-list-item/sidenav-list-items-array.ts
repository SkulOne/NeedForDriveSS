import { SidenavListItem } from './sidenav-list-item';

export const listItems: SidenavListItem[] = [
  {
    icon: 'create',
    textContent: 'Карточка автомобиля',
    routerLink: '/admin/carSetting',
  },
  { icon: 'vertical_split', textContent: 'Список авто', routerLink: '/admin/carList' },
  { icon: 'note_add', textContent: 'Заказы', routerLink: '/main' },
  { icon: 'view_module', textContent: 'Menu 4', routerLink: '/main' },
  { icon: 'view_column', textContent: 'Menu 5', routerLink: '/main' },
  { icon: 'person', textContent: 'Menu 6', routerLink: '/main' },
  { icon: 'error', textContent: 'Menu 7', routerLink: '/main' },
];
