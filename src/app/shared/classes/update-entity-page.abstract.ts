import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { UpdateEntityConfig } from '@shared/interfaces/update-entity-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormChangedValue } from '@shared/interfaces/form-changed-value';
import { HttpBackService } from '@shared/services/http-back.service';
import { ActivatedRoute } from '@angular/router';
import { listItems } from '../../modules/admin/side-nav-list-item/sidenav-list-items-array';
import { EntityInputs } from '../../modules/admin/entity-page/inputs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class UpdateEntityPage<T> implements OnInit, OnDestroy {
  form: FormGroup;
  showSpinner: boolean;
  progressValue = 0;
  formGeneratedTrigger$ = new Subject();
  saveEntityTrigger$ = new Subject<T>();
  data = [];
  _entityName: string;
  _service: HttpBackService;

  private formGenerated$ = this.formGeneratedTrigger$.asObservable();
  private saveEntity$ = this.saveEntityTrigger$.asObservable();
  private _entity: T;
  private _formBuilder: FormBuilder;
  private _ignoredKeys = ['updatedAt', 'createdAt', 'id', 'coords'];
  private _snackBar: MatSnackBar;
  private _changeDetectorRef: ChangeDetectorRef;
  private _activatedRoute: ActivatedRoute;
  private _emptyEntity: unknown;
  private _inputs: EntityInputs;
  private index: number;
  protected constructor(
    service: HttpBackService,
    router: ActivatedRoute,
    inputs: EntityInputs,
    config: UpdateEntityConfig
  ) {
    this._formBuilder = config.formBuilder;
    this._snackBar = config.snackBar;
    this._service = service;
    this._activatedRoute = router;
    this._inputs = inputs;
    this._changeDetectorRef = config.changeDetectorRef;
  }

  @Input() set entity(value: T) {
    if (value) {
      this._entity = value;
      this.data = [];
      this.generateForm();
    }
  }

  ngOnInit(): void {
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
        // @ts-ignore todo Разберись
        switchMap((entity) => this.saveEntity(this._service, entity, entity.id))
      )
      .subscribe(() => {
        this.showSpinner = false;
        this.form.reset();
        this.openSuccessfulSnackBar('Категория добавлена. Обновите таблицу.');
        this._changeDetectorRef.detectChanges();
      });

    this._activatedRoute.url
      .pipe(
        untilDestroyed(this),
        map((value) => {
          const commands = value.map((item) => item.path);
          this._entityName = commands[commands.length - 1];
          const url = '/admin/' + commands.join('/');
          this._emptyEntity = listItems.filter((item) => url === item.routerLink)[0].data;
          this._inputs[this._entityName].inputs.forEach((input) => {
            if ('dataName' in input) {
              this.data.push(this._service.getAll(input.dataName));
            }
          });
          this.cancel();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {}

  getEntity(): T {
    return this._entity;
  }

  cancel(): void {
    this._entity = null;
    this._changeDetectorRef.detectChanges();
  }

  save(): void {
    this.showSpinner = true;
    const formValue = this.form.value;
    // @ts-ignore todo Разберись
    if (this.getEntity().id) {
      // @ts-ignore todo Разберись
      formValue.id = this.getEntity().id;
    }
    this.saveEntityTrigger$.next(formValue);
  }

  createEntity(): void {
    this.entity = this._emptyEntity as T;
    this._changeDetectorRef.detectChanges();
  }

  getEntityPropertyArray(): Observable<unknown> {
    return this.data[this.index ? this.index++ : 0];
  }

  private saveEntity(service: HttpBackService, entity: T, id: string): Observable<T> {
    if (id) {
      return service.put<T>(this._entityName, entity, id);
    }
    return service.post<T>(this._entityName, entity);
  }

  private generateForm(): void {
    const formControls = {};
    Object.keys(this._entity).forEach((key) => {
      if (this._ignoredKeys.indexOf(key) < 0) {
        const formControlValue = this._entity ? this._entity[key] : null;
        formControls[key] = this._formBuilder.control(formControlValue, Validators.required);

        if (key.slice(key.length - 2).includes('Id')) {
          this.data.push(this._service.getAll(key.slice(0, key.length - 2)));
        }
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
