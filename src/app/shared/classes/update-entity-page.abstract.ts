import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { UpdateEntityConfig } from '@shared/interfaces/update-entity-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormChangedValue } from '@shared/interfaces/form-changed-value';
import { HttpBackService } from '@shared/services/http-back.service';
import { ActivatedRoute } from '@angular/router';
import { EntityInputs } from '@shared/interfaces/entity-inputs';
import { getId } from '@shared/utils';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class UpdateEntityPage<T> implements OnInit, OnDestroy {
  form: FormGroup;
  showSpinner: boolean;
  progressValue = 0;
  formGeneratedTrigger$ = new Subject();
  dataChangeTrigger$ = new Subject();
  saveEntityTrigger$ = new Subject<T>();
  data = {};
  entityName: string;

  private _service: HttpBackService;
  private formGenerated$ = this.formGeneratedTrigger$.asObservable();
  private saveEntity$ = this.saveEntityTrigger$.asObservable();
  private dataChange$ = this.dataChangeTrigger$.asObservable();
  private _entity: T;
  private _formBuilder: FormBuilder;
  private _snackBar: MatSnackBar;
  private _changeDetectorRef: ChangeDetectorRef;
  private _activatedRoute: ActivatedRoute;
  private _inputs: EntityInputs;
  private _index = 0;
  protected constructor(
    service: HttpBackService,
    router: ActivatedRoute,
    inputs: EntityInputs,
    config: UpdateEntityConfig
  ) {
    this._service = service;
    this._formBuilder = config.formBuilder;
    this._snackBar = config.snackBar;
    this._activatedRoute = router;
    this._inputs = inputs;
    this._changeDetectorRef = config.changeDetectorRef;
  }

  @Input() set entity(value: T) {
    if (value) {
      this._entity = value;
      this.data = {};
      this.generateForm();
    }
  }

  ngOnInit(): void {
    this.dataChange$
      .pipe(
        untilDestroyed(this),
        map((data) => data)
      )
      .subscribe((value) => {
        this.data[value[0]] = value[1];
      });

    this.formGenerated$
      .pipe(
        untilDestroyed(this),
        switchMap(() =>
          this.form.valueChanges.pipe(
            switchMap((changedValue) => this.formSupplemented(changedValue))
          )
        )
      )
      .subscribe();

    this.saveEntity$
      .pipe(
        untilDestroyed(this),
        switchMap((entity) => this.saveEntity(this._service, entity, getId(entity)))
      )
      .subscribe(() => {
        this.showSpinner = false;
        this.form.reset();
        this.openSuccessfulSnackBar('Сущность добавлена. Обновите таблицу.');
        this._changeDetectorRef.detectChanges();
      });

    this._activatedRoute.url
      .pipe(
        untilDestroyed(this),
        map((value) => {
          const commands = value.map((item) => item.path);
          this.entityName = commands[commands.length - 1];
          this._inputs[this.entityName].inputs.forEach((input) => {
            if ('dataName' in input) {
              this.dataChangeTrigger$.next([input.dataName, this._service.getAll(input.dataName)]);
            }
          });
          this.resetEntity();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

  getEntity(): T {
    return this._entity;
  }

  resetEntity(): void {
    this._entity = null;
    this._changeDetectorRef.detectChanges();
  }

  saveTrigger(): void {
    this.showSpinner = true;
    const formValue = this.form.value;
    formValue.id = getId(this.getEntity());
    this.saveEntityTrigger$.next(formValue);
  }

  createEntity(): void {
    this.entity = {} as T;
    this._changeDetectorRef.detectChanges();
  }

  getEntityPropertyArray(dataName: string): Observable<unknown> {
    return this.data[dataName];
  }

  private saveEntity(service: HttpBackService, entity: T, id: string): Observable<T> {
    if (id) {
      return service.put<T>(this.entityName, entity, id);
    }
    return service.post<T>(this.entityName, entity);
  }

  private generateForm(): void {
    const formControls = {};
    const entityInput = this._inputs[this.entityName].inputs;
    entityInput.forEach((key) => {
      const control = key.controlName;
      const formControlValue = this._entity ? this._entity[control] : null;
      formControls[control] = this._formBuilder.control(formControlValue, Validators.required);
      if (control.slice(control.length - 2).includes('Id')) {
        const dataName = control.slice(0, control.length - 2);
        this.dataChangeTrigger$.next([dataName, this._service.getAll(dataName)]);
      }
    });
    this.form = this._formBuilder.group(formControls);
    this.formSupplemented(this.form.value);
    this.formGeneratedTrigger$.next();
  }

  private formSupplemented(changedValue: FormChangedValue): Observable<unknown> {
    const changedValueArray = Object.values(changedValue);
    const length = changedValueArray.length;
    const valuesLength = Object.values(changedValueArray).filter((value) => value).length;
    this.progressValue = (valuesLength / length) * 100;
    return EMPTY;
  }

  private openSuccessfulSnackBar(message: string): void {
    this._snackBar.open(message, 'Ok!', {
      duration: 750,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
