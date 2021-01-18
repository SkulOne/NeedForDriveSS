import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpBackService } from '@shared/services/http-back.service';
import { UpdateEntityPage } from '@shared/classes/update-entity-page.abstract';
import { ActivatedRoute } from '@angular/router';
import { RouterDataService } from '@shared/services/router-data.service';
import { inputs } from '../inputs';

@Component({
  selector: 'app-entity-settings',
  templateUrl: './entity-settings.component.html',
  styleUrls: ['./entity-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitySettingsComponent extends UpdateEntityPage<any> implements OnInit {
  inputs = inputs;

  constructor(
    private routerData: RouterDataService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private httpBack: HttpBackService
  ) {
    super(httpBack, activatedRoute, inputs, { formBuilder, snackBar, changeDetectorRef });
  }
}
