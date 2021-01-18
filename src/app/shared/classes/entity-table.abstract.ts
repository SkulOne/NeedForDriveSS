import { InputType, TableHeader } from '@shared/interfaces/table-header';
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
import { EMPTY, Observable, Subject } from 'rxjs';
import { UpdateEntityConfig } from '@shared/interfaces/update-entity-config';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../modules/shared-module/components/confrim-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpBackService } from '@shared/services/http-back.service';
import { ActivatedRoute } from '@angular/router';
import { inputs } from '../../modules/admin/entity-page/inputs';
import { orderStatusIds } from '@shared/orderStatusIdConst';
import { dateValidator, oneValue } from '@shared/validators';

export { orderStatusIds } from '@shared/orderStatusIdConst';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class EntityTable<T> implements OnInit, OnDestroy {
  @Output() entitySelect = new EventEmitter<T>();
  columns: string[];
  showSpinner: boolean;
  sortingForm: FormGroup;
  dataSource: MatTableDataSource<T>;
  sortInputs: TableHeader[];
  formGeneratedTrigger$ = new Subject();
  resetFormTrigger$ = new Subject();
  pageEventTrigger$ = new Subject();
  sortButtonTrigger$ = new Subject();
  pageSizeOptions = [7, 20, 60, 100];
  optionColumns = ['edit', 'delete'];
  maskedVisible: boolean;

  private deleteBtnTrigger$ = new Subject<{ id: string; message: string }>();
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  private formGenerated$ = this.formGeneratedTrigger$.asObservable();
  private resetForm$ = this.resetFormTrigger$.asObservable();
  private deleteBtn$ = this.deleteBtnTrigger$.asObservable();
  private pageEvent$ = this.pageEventTrigger$.asObservable();
  private sortButton$ = this.sortButtonTrigger$.asObservable();
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
          this.sortInputs = inputs[this._entityName].properties;
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

    // todo: Возможно можно будет вернуть, обсуди с ментором
    // this.sorting$().pipe(untilDestroyed(this)).subscribe();

    this.sortButton$
      .pipe(
        untilDestroyed(this),
        switchMap(() => {
          this.showSpinner = true;

          return this._service.getAll<T>(this._entityName, 0, 49, this.getSortingProperty());
        })
      )
      .subscribe((data) => {
        this.showSpinner = false;
        this.data = data;
      });

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
              pageEvent.pageSize * 3,
              this.getSortingProperty()
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

  private getSortingProperty(): unknown[] {
    const sortingValue = this.sortingForm.value;
    const values = [];
    Object.keys(sortingValue).forEach((key) => {
      if (sortingValue[key]) {
        const value =
          key === 'orderStatusId' ? orderStatusIds[sortingValue[key] + 'Id'] : sortingValue[key];
        console.log({ [key]: value });
        values.push({ [key]: value });
      }
    });
    return values;
  }

  private generateSortForm(): void {
    const formControls = {};
    this.sortInputs.forEach((key) => {
      const control = this._formBuilder.control(null);
      switch (key.type) {
        case InputType.Date:
          control.setValidators(dateValidator);
          break;
        case InputType.Number:
          control.setValidators(oneValue);
      }
      formControls[key.matColumnDef] = control;
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

  // private sorting$(): Observable<unknown> {
  //   return this.sortingForm.valueChanges.pipe(
  //     mergeMap((values: FormChangedValue) => this.getChangedControl(values)),
  //     switchMap((control) => {
  //       this.dataSorting(control);
  //       return EMPTY;
  //     })
  //   );
  // }

  private crateDisplayedColumns(): void {
    const columns = this.sortInputs.map((value) => value.matColumnDef);
    this.columns = columns.concat(this.optionColumns);
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
