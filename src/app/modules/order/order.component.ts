import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OrderService } from '@shared/services/order.service';
import { Order } from '@shared/interfaces/order';
import { Router } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
  breakpoint = 4;
  order: Order;
  isReady: boolean;
  showProcess: boolean;

  constructor(private orderService: OrderService, private router: Router) {}

  @HostListener('window:resize') onResize(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }

  ngOnInit(): void {
    this.orderService.orderTrigger(null);

    this.orderService.order.pipe(untilDestroyed(this)).subscribe((value) => {
      this.order = { ...value };
    });
  }

  ngOnDestroy(): void {}

  postOrder(): void {
    this.showProcess = true;
    this.orderService
      .getOrderStatus()
      .pipe(
        switchMap((orderStatus) => {
          this.order.orderStatusId = orderStatus;
          return this.orderService.postOrder(this.order);
        }),
        untilDestroyed(this)
      )
      .subscribe((orderId) => {
        this.showProcess = false;
        this.router.navigate(['/order', orderId]);
      });
  }

  nextStep(): void {
    this.orderService.nextStepBtnTrigger.next();
  }

  routerComponentEvents($event: any): void {
    if ($event instanceof StepperComponent) {
      ($event as StepperComponent).isReady.subscribe((value) => {
        this.isReady = value;
      });
    }
  }

  cancelOrder(): void {
    this.orderService.cancelOrder(this.order).pipe(untilDestroyed(this)).subscribe();
    this.router.navigate(['/order']);
  }
}
