import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SidenavListItem } from './sidenav-list-item';

@Component({
  selector: 'app-sidenav-list-item',
  templateUrl: './sidenav-list-item.component.html',
  styleUrls: ['./sidenav-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavListItemComponent {
  @Input() item: SidenavListItem;

  constructor() {}
}
