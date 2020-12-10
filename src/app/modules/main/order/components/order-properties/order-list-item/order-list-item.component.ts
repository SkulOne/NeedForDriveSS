import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListItemComponent {
  @Input() title: string;
  @Input() subtitle: string;
  constructor() {}
}
