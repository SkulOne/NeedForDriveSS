import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/interfaces/order';
import { Router } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';

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

  constructor(private orderService: OrderService, private router: Router) {}

  @HostListener('window:resize') onResize(): void {
    this.breakpoint = window.innerWidth <= 767 ? 3 : 4;
  }

  ngOnInit(): void {
    this.orderService.orderTrigger({
      orderStatusId: 'new',
      color: 'Любой',
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
      price: 0,
    });

    this.orderService.order.pipe(untilDestroyed(this)).subscribe((value) => {
      this.order = { ...value };
    });
  }

  ngOnDestroy(): void {}

  postOrder(): void {
    this.orderService
      .postOrder(this.order)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.router.navigate(['/order', value]);
      });
  }

  nextStep(): void {
    this.orderService.nextStepBtnTrigger.next();
  }

  log($event: any): void {
    if (($event as StepperComponent).isReady) {
      ($event as StepperComponent).isReady.subscribe((value) => {
        this.isReady = value;
      });
    }
  }
}
