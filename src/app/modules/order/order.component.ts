import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  breakpoint = 4;
  constructor() {}

  @HostListener('window:resize') onResize(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }
}
