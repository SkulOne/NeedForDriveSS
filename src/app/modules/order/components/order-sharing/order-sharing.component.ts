import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../../shared/interfaces/order';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-order-sharing',
  templateUrl: './order-sharing.component.html',
  styleUrls: ['./order-sharing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSharingComponent implements OnInit, OnDestroy {
  @Input() order: Order;
  breakpoint = 4;
  constructor(private route: ActivatedRoute, private orderService: OrderService) {}
  @HostListener('window:resize') onResize(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((id) => {
          // todo Какой тип указать?
          // @ts-ignore
          return this.orderService.getOrderById(id.params.id);
        }),
        untilDestroyed(this)
      )
      .subscribe((value) => {
        this.order = value;
      });
  }

  ngOnDestroy(): void {}
}
