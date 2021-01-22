import { TableHeader } from '@shared/interfaces/table-header';
import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { UpdateEntityConfig } from '@shared/interfaces/update-entity-config';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { mergeMap, switchMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../modules/shared-module/components/confrim-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormChangedValue } from '@shared/interfaces/form-changed-value';
import { HttpBackService } from '@shared/services/http-back.service';
import { ActivatedRoute } from '@angular/router';
import { inputs } from '../../modules/admin/entity-page/inputs';
import { EntityInput } from '@shared/interfaces/entity-inputs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class EntityTable<T> implements OnInit, OnDestroy {
  @Output() entitySelect = new EventEmitter<T>();
  columns: string[];
  headers: TableHeader[];
  showSpinner: boolean;
  sortingForm: FormGroup;
  dataSource: MatTableDataSource<T>;
  sortInputs: EntityInput[];
  formGeneratedTrigger$ = new Subject();
  resetFormTrigger$ = new Subject();
  pageEventTrigger$ = new Subject();
  pageSizeOptions = [7, 20, 60, 100];

  private deleteBtnTrigger$ = new Subject<{ id: string; message: string }>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  private formGenerated$ = this.formGeneratedTrigger$.asObservable();
  private resetForm$ = this.resetFormTrigger$.asObservable();
  private deleteBtn$ = this.deleteBtnTrigger$.asObservable();
  private pageEvent$ = this.pageEventTrigger$.asObservable();
  private _ignoredKeys = ['updatedAt', 'createdAt', 'id'];
  private _formBuilder: FormBuilder;
  private _dialog: MatDialog;
  private _snackBar: MatSnackBar;
  private _changeDetectorRef: ChangeDetectorRef;
  private _service: HttpBackService;
  private _router: ActivatedRoute;
  private _entityName: string;
  private _data = [];
  private _pageIndex = 0;

  protected constructor(
    service: HttpBackService,
    router: ActivatedRoute,
    config: UpdateEntityConfig
  ) {
    this._formBuilder = config.formBuilder;
    this._dialog = config.dialog;
    this._snackBar = config.snackBar;
    this._changeDetectorRef = config.changeDetectorRef;
    this._service = service;
    this._router = router;
  }

  set data(value: T[]) {
    this._data = value;
    this.dataSource = new MatTableDataSource<T>(value);
    this.dataSource.sortingDataAccessor = this.getSortingDataAccessor();
    this.formGeneratedTrigger$.next();
    this.dataSource.paginator = this._paginator;
    this.dataSource.sort = this._sort;
  }

  ngOnInit(): void {
    this._router.url
      .pipe(
        untilDestroyed(this),
        switchMap((params) => {
          this._entityName = params.pop().path;
          this.headers = inputs[this._entityName].tableHeaders;
          this.sortInputs = inputs[this._entityName].inputs;
          this.generateSortForm();
          return this.setData();
        })
      )
      .subscribe(() => {});

    this.deleteBtn$
      .pipe(
        untilDestroyed(this),
        switchMap((value) => this.handlingDeleteBtn(value.id, value.message))
      )
      .subscribe((result) => {
        if (result) {
          this.openSuccessfulSnackBar('Сущность успешно удалена');
        }
        this.resetFormTrigger$.next();
        this.showSpinner = false;
        this.detect();
      });

    this.sorting$().pipe(untilDestroyed(this)).subscribe();

    this.formGenerated$.pipe(untilDestroyed(this)).subscribe(() => {
      this.detect();
    });

    this.resetForm$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.setData())
      )
      .subscribe();

    this.pageEventTrigger$.next();

    this.pageEvent$
      .pipe(
        untilDestroyed(this),
        switchMap((pageEvent: PageEvent) => {
          if (
            (pageEvent.pageIndex * pageEvent.pageSize) / pageEvent.length >= 0.75 ||
            pageEvent.pageSize > pageEvent.length
          ) {
            this.showSpinner = true;
            return this._service.getAll<T>(
              this._entityName,
              this._pageIndex++,
              pageEvent.pageSize * 3
            );
          }
          return EMPTY;
        })
      )
      .subscribe((entityList) => {
        this.showSpinner = false;
        this.dataSource.data = this.dataSource.data.concat(entityList);
      });
  }

  selectEntity(entity: T): void {
    this.entitySelect.emit(entity);
  }

  resetData(): void {
    this.generateSortForm();
    this.sortingForm.reset();
    this.resetFormTrigger$.next();
  }

  deleteEvent(id: string, message: string): void {
    this.deleteBtnTrigger$.next({ id, message });
  }

  ngOnDestroy(): void {}

  private generateSortForm(): void {
    const formControls = {};
    this.sortInputs.forEach((key) => {
      if (this._ignoredKeys.indexOf(key.controlName) < 0) {
        formControls[key.controlName] = this._formBuilder.control(null);
      }
    });
    this.sortingForm = this._formBuilder.group(formControls);
    this.formGeneratedTrigger$.next();
  }

  private openDialog(message: string): Observable<unknown> {
    return this._dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: message,
        },
      })
      .afterClosed();
  }

  private openSuccessfulSnackBar(message: string): void {
    this._snackBar.open(message, 'Ok!', {
      duration: 750,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private sorting$(): Observable<unknown> {
    return this.sortingForm.valueChanges.pipe(
      mergeMap((values: FormChangedValue) => this.getChangedControl(values)),
      switchMap((control) => {
        this.dataSorting(control);
        return EMPTY;
      })
    );
  }

  private crateDisplayedColumns(): void {
    const columns = this.headers.map((value) => value.matColumnDef);
    const optionColumns = ['edit', 'delete'];
    this.columns = columns.concat(optionColumns);
  }

  private setData(): Observable<void> {
    this.showSpinner = true;
    return this._service.getAll<T>(this._entityName).pipe(
      switchMap((property) => {
        this.crateDisplayedColumns();
        this.data = property;
        this.showSpinner = false;
        this._changeDetectorRef.detectChanges();
        return EMPTY;
      })
    );
  }

  private getChangedControl(values: FormChangedValue): string[] | Observable<null> {
    const keys = Object.keys(values);
    const control = keys.filter((key: string) => values[key]);
    return control.length ? control : of(null);
  }

  private dataSorting(control: string): void {
    console.log(control);
    let filteredData = this._data;
    if (control) {
      const filteredValue = this.sortingForm.get(control).value.toString().toLowerCase();
      filteredData = this._data.filter((entity) => {
        let value = entity[control];
        if (typeof value === 'object') {
          value = value?.name;
        }
        return value?.toString().toLowerCase().indexOf(filteredValue) > -1;
      });
    }
    this.dataSource.data = filteredData;
  }

  private detect(): void {
    this._changeDetectorRef.detectChanges();
  }

  private handlingDeleteBtn(id: string, message: string): Observable<void | object> {
    return this.openDialog(message).pipe(
      switchMap((value) => {
        if (value) {
          this.showSpinner = true;
          this._changeDetectorRef.detectChanges();
          return this._service.delete(this._entityName, id);
        }
        return EMPTY;
      })
    );
  }

  private getSortingDataAccessor(): (item: T, property: string) => string | number {
    return (item, property) => {
      if (typeof item[property] === 'object') {
        return item[property].name;
      }
      return item[property];
    };
  }
}
