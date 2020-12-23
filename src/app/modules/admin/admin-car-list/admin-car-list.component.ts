import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryId, ICar } from '@shared/interfaces/ICar';
import { CarService } from '@shared/services/car.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared-module/components/confrim-dialog/confirm-dialog.component';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@shared/services/category.service';
import { sortInputsArray } from './sortInputsArray';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.scss'],
})
export class AdminCarListComponent implements OnInit, OnDestroy {
  displayedColumns = ['category', 'name', 'number', 'priceMin', 'priceMax', 'tank', 'edit', 'log'];
  dataSource: MatTableDataSource<ICar>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showSpinner: boolean;
  sortingForm: FormGroup;
  categories$: Observable<CategoryId[]>;
  sortInputs = sortInputsArray;

  private cars: ICar[];

  constructor(
    private carService: CarService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initSortingForm();
    this.initTable();
    this.categories$ = this.categoryService.getAll();
    this.sortingForm.valueChanges
      .pipe(
        untilDestroyed(this),
        mergeMap((values) => {
          const keys = Object.keys(values);
          return keys.filter((key: string) => values[key]);
        })
      )
      .subscribe((control) => {
        const filteredValue = this.sortingForm.get(control).value.toString().toLowerCase();
        this.dataSource.data = this.cars.filter((car) => {
          const value = control === 'category' ? car.categoryId.name : car[control];
          return value?.toString().toLowerCase().indexOf(filteredValue) > -1;
        });
      });
  }

  ngOnDestroy(): void {}

  edit(car: ICar): void {
    this.router.navigate(['/admin/carSetting', car.id]);
  }

  deleteCar(car: ICar): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Вы уверены что хотите удалить автомобиль?',
        },
      })
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        switchMap((isConfirmed) => {
          if (isConfirmed) {
            return this.carService.delete(car.id);
          }
          return of(null);
        })
      )
      .subscribe(() => {
        this.snackBar.open('Машина успешно удалена!', 'Ok!', {
          duration: 750,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.initTable();
      });
  }

  getSortingDataAccessor(): (item: ICar, property: string) => string | number {
    return (item, property) => {
      if (property === 'category') {
        return item.categoryId.name;
      }
      return item[property];
    };
  }

  initSortingForm(): void {
    this.sortingForm = this.formBuilder.group({
      category: null,
      name: null,
      number: null,
      priceMin: null,
      priceMax: null,
    });
  }

  resetData(): void {
    this.initTable();
    this.sortingForm.reset();
  }

  private initTable(): void {
    this.showSpinner = true;
    this.carService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((cars) => {
        this.cars = cars;
        this.dataSource = new MatTableDataSource<ICar>(this.cars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = this.getSortingDataAccessor();
        this.showSpinner = false;
      });
  }
}
