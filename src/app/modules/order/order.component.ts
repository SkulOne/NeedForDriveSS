import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OrderService } from '../../shared/services/order.service';
import { Point } from '../../shared/interfaces/point';
import { Car } from '../../shared/interfaces/car';
import { Order } from '../../shared/interfaces/order';
import { LeaseDuration } from '../../shared/interfaces/lease-duration';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
  breakpoint = 4;
  point: Point;
  car: Car;
  order: Order;
  leaseDuration: LeaseDuration;

  constructor(private orderService: OrderService) {}

  @HostListener('window:resize') onResize(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }

  ngOnInit(): void {
    this.orderService.orderBehavior.next({
      orderStatusId: 'new',
      color: 'Любой',
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
      price: 0,
    });

    this.orderService.orderBehavior.pipe(untilDestroyed(this)).subscribe((value) => {
      this.order = { ...value };
    });
  }

  ngOnDestroy(): void {}
}
