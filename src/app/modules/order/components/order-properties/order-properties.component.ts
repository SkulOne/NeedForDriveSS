import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { Point } from '../../../../shared/interfaces/point';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent implements OnInit, OnDestroy {
  @Input() point: Point;
  constructor(private orderService: OrderService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.orderService.point.pipe(untilDestroyed(this)).subscribe((value) => {
      this.point = value;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {}
}
