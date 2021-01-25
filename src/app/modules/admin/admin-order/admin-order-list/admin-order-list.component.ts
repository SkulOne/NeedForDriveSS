import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { EntityTable } from '@shared/classes/entity-table.abstract';
import { Order } from '@shared/interfaces/order';
import { HttpBackService } from '@shared/services/http-back.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '@shared/services/order.service';
import { Subject } from 'rxjs';
import { ChangeStatus } from '@shared/interfaces/change-status';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { orderStatusIds } from '@shared/orderStatusIdConst';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: [
    './admin-order-list.component.scss',
    '/src/app/modules/admin/entity-page/entity-list/entity-list.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrderListComponent extends EntityTable<Order> implements OnInit, OnDestroy {
  changeStatusButtonTrigger = new Subject<ChangeStatus>();
  orderStatusIds = orderStatusIds;
  private changeStatusButton$ = this.changeStatusButtonTrigger.asObservable();

  constructor(
    private httpBack: HttpBackService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public orderService: OrderService
  ) {
    super(httpBack, activatedRoute, { changeDetectorRef, dialog, formBuilder, snackBar });
    this.optionColumns = ['confirm', 'issue', 'cancel', 'delete'];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.changeStatusButton$
      .pipe(
        untilDestroyed(this),
        switchMap((value) => this.orderService.changeOrderStatus(value.order, value.statusId))
      )
      .subscribe(() => {
        this.snackBar.open('Статус успешно обновлён', 'OK!', {
          duration: 750,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }
}
