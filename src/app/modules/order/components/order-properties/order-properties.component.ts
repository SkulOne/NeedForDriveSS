import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { Point } from '../../../../shared/interfaces/point';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent implements OnInit {
  point: Point;
  constructor(
    private orderService: OrderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.orderService.point.subscribe((value) => {
      this.point = value;
      this.changeDetectorRef.detectChanges();
    });
  }
}
