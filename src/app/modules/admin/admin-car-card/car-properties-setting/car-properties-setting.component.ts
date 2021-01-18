import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { carProperties } from './properties-inputs';
import { ICar, CategoryId } from '@shared/interfaces/ICar';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
export class CarPropertiesSettingComponent extends UpdateEntityPage<ICar> {
  inputs = inputs;
  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private service: HttpBackService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super(service, router, inputs, { formBuilder, changeDetectorRef, dialog, snackBar });
  }
}
