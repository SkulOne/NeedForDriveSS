import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EntityTable } from '@shared/classes/entity-table.abstract';
import { Order } from '@shared/interfaces/order';
import { HttpBackService } from '@shared/services/http-back.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrderListComponent extends EntityTable<Order> {
  constructor(
    private httpBack: HttpBackService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    super(httpBack, activatedRoute, { changeDetectorRef, dialog, formBuilder, snackBar });
    this.optionColumns = this.optionColumns.concat(['accept', 'issue', 'cancel']);
  }
}
