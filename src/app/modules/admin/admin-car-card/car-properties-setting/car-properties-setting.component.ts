import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private httpBackService: HttpBackService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super(httpBackService, activatedRoute, inputs, {
      formBuilder,
      changeDetectorRef,
      dialog,
      snackBar,
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.entity = JSON.parse(localStorage.getItem('car'));
    this.changeDetectorRef.detectChanges();
  }

  cancelBtn(): void {
    localStorage.removeItem('car');
    this.resetEntity();
  }

  navigateToList(): void {
    this.router.navigate(['admin', 'list', 'car']);
  }
}
