import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../../../../shared/interfaces/order';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInfoComponent implements OnInit {
  order$: Observable<Order>;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order$ = this.orderService.order;
  }
}
