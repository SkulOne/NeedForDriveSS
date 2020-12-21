import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ICar } from '@shared/interfaces/ICar';
import { CarService } from '@shared/services/car.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared-module/components/confrim-dialog/confirm-dialog.component';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.scss'],
})
export class AdminCarListComponent implements OnInit, OnDestroy {
  displayedColumns = ['category', 'name', 'number', 'priceMin', 'priceMax', 'tank', 'edit', 'log'];
  dataSource: MatTableDataSource<ICar>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carService: CarService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((cars) => {
        this.dataSource = new MatTableDataSource<ICar>(cars);
        this.dataSource.paginator = this.paginator;
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
      });
  }
}
