import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../../../shared/interfaces/order';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OrderService } from '../../../../../shared/services/order.service';

@Component({
  selector: 'app-order-sharing',
  templateUrl: './order-sharing.component.html',
  styleUrls: ['./order-sharing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSharingComponent implements OnInit, OnDestroy {
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService
      .getOrderById(id)
      .pipe(untilDestroyed(this))
      .subscribe((order) => {
        this.order = order;
        this.orderService.orderTrigger(order);
        this.changeDetectionRef.markForCheck();
      });
  }

  ngOnDestroy(): void {}
}
