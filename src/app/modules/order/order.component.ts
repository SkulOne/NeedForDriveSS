import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OrderService } from '../../shared/services/order.service';
import { Point } from '../../shared/interfaces/point';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
  breakpoint = 4;
  point: Point;
  constructor(private orderService: OrderService) {}

  @HostListener('window:resize') onResize(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }

  ngOnDestroy(): void {
    this.orderService.point.pipe(untilDestroyed(this)).subscribe((value) => {
      this.point = value;
    });
  }

  ngOnInit(): void {}
}
