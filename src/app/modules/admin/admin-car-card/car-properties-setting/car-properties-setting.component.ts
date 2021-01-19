import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpBackService } from '@shared/services/http-back.service';
import { inputs } from '../../entity-page/inputs';
import { UpdateEntityPage } from '@shared/classes/update-entity-page.abstract';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from '@shared/classes/car';

@Component({
  selector: 'app-car-properties-setting',
  templateUrl: './car-properties-setting.component.html',
  styleUrls: ['./car-properties-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarPropertiesSettingComponent extends UpdateEntityPage<Car> implements OnInit {
  inputs = inputs;
  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private httpBackService: HttpBackService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(httpBackService, router, inputs, { formBuilder, changeDetectorRef, dialog, snackBar });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.entity = JSON.parse(localStorage.getItem('car'));
    this.changeDetectorRef.detectChanges();
  }
}
