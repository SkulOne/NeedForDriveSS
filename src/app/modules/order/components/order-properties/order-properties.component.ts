import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { LeaseDuration } from '@shared/interfaces/lease-duration';
import { Order } from '@shared/interfaces/order';
import { getDifferenceDays } from '@shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent implements OnDestroy {
  leaseDuration: LeaseDuration;
  buttonContent: string;
  @Input() isReady: boolean;
  @Output() sendOrder = new EventEmitter();
  @Output() nextStepTrigger = new EventEmitter();
  @Output() cancelBtnTrigger = new EventEmitter();
  private _order: Order;

  constructor(public dialog: MatDialog) {}

  get order(): Order {
    return this._order;
  }

  @Input() set order(value: Order) {
    if (!this.order) {
      this.isReady = false;
    }
    this._order = value;
    if (this.order) {
      if (!this.order.carId && !this.order.price) {
        this.buttonContent = 'Выбрать модель';
      }
      if (this.order.carId && !this.order.price) {
        this.buttonContent = 'Дополнительно';
      }
      if (this.order.dateTo && this.order.dateFrom) {
        this.leaseDuration = getDifferenceDays(this.order.dateFrom, this.order.dateTo);
      }
      if (this.order.carId && this.order.price) {
        this.buttonContent = 'Итого';
      }
    } else {
      this.buttonContent = 'Выбрать модель';
    }
  }

  showConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          this.sendOrder.emit();
          this.isReady = false;
        }
      });
  }
  ngOnDestroy(): void {}

  cancelBtn(): void {
    this.cancelBtnTrigger.emit();
  }
}
