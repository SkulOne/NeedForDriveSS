import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EntityTable } from '@shared/classes/entity-table.abstract';
import { Car } from '@shared/classes/car';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpBackService } from '@shared/services/http-back.service';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarListComponent {
  constructor() {}
  // constructor(private service: HttpBackService, private activatedRoute: ActivatedRoute,
  //             private snackBar: MatSnackBar, private dialog: MatDialog,
  //             private changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder) {
  //   super(service, activatedRoute, { snackBar, dialog, changeDetectorRef, formBuilder });
  // }
}
