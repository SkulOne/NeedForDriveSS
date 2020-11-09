import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LocationService } from '../../../../shared/services/location.service';
import { mapStyle } from './mapStyle';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PointService } from '../../../../shared/services/point.service';
import { City } from '../../../../shared/interfaces/city';
import { Point } from '../../../../shared/interfaces/point';
import { OrderService } from '../../../../shared/services/order.service';
import { checkInterface } from '../../../../shared/utils';
import MapTypeStyle = google.maps.MapTypeStyle;
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnInit, OnDestroy {
  @Input() locationForm: AbstractControl;
  mapStyle: MapTypeStyle[] = mapStyle;

  coords$: Observable<LatLng | LatLngLiteral>;
  points: Point[];
  filteredOptions: Observable<City[]>;
  filteredPoints: Observable<Point[]>;
  zoom = 11;

  constructor(
    private locationService: LocationService,
    private pointService: PointService,
    private orderService: OrderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.coords$ = this.locationService.getUserCoords();

    this.locationService
      .getAllCity()
      .pipe(untilDestroyed(this))
      .subscribe((cities) => {
        this.filteredOptions = this.locationForm.get('city').valueChanges.pipe(
          startWith(''),
          map((changedValue) => this.filter(changedValue, cities) as City[])
        );
      });

    this.clear();
  }

  citySelected(city: City): void {
    this.coords$ = this.locationService.getCoordsByAddress(city.name);
    this.getPoints(city);
  }

  clear(): void {
    this.locationForm
      .get('city')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value.length) {
          this.locationForm.get('pickupPoint').setValue('');
        }
      });
  }

  addressSelect(point: Point): void {
    this.orderService.point.next(point);
  }

  markerClick(point: Point): void {
    this.locationForm.get('city').setValue(point.cityId.name);
    this.locationForm.get('pickupPoint').setValue(point.address);
    this.addressSelect(point);
  }

  clearValue(formControlName: string): void {
    this.locationForm.get(formControlName).setValue('');
  }

  ngOnDestroy(): void {}

  private getPoints(city: City): void {
    this.pointService
      .getPointsFormCity(city.id)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.points = value;
        this.filteredPoints = this.locationForm
          .get('pickupPoint')
          .valueChanges.pipe(
            startWith(''),
            map((changedValue) => this.filter(changedValue, value) as Point[])
          );
        this.changeDetectorRef.detectChanges();
      });
  }

  private filter(value: string, array: City[] | Point[]): City[] | Point[] {
    const filterValue = value.toLowerCase();
    if (checkInterface<Point>('address', array[0])) {
      return (array as Point[]).filter(
        (option) => option.address.toLowerCase().indexOf(filterValue) > -1
      );
    } else {
      return (array as City[]).filter(
        (option) => option.name.toLowerCase().indexOf(filterValue) > -1
      );
    }
  }
}
