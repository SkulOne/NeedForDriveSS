import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ICar } from '@shared/interfaces/ICar';
import { CarService } from '@shared/services/car.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.scss'],
})
export class AdminCarListComponent implements OnInit, OnDestroy {
  displayedColumns = ['category', 'name', 'number', 'priceMin', 'priceMax', 'tank', 'edit', 'log'];
  dataSource: MatTableDataSource<ICar>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private carService: CarService, private router: Router) {}

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

  log(car: ICar): void {
    console.log(car);
  }

  edit(car: ICar): void {
    this.router.navigate(['/admin/carSetting', car.id]);
  }
}
