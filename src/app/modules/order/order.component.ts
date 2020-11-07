import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  breakpoint = 4;
  constructor() {}

  log(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }
}
