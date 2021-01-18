import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '@shared/services/location.service';
import { mapStyle } from './map-style';
import { Observable, of } from 'rxjs';
import { PointService } from '@shared/services/point.service';
import { City } from '@shared/interfaces/city';
import { Point } from '@shared/interfaces/point';
import { OrderService } from '@shared/services/order.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatOptionSelectionChange } from '@angular/material/core';
import { autocompleteValidator } from '@shared/validators';
import { OrderStepperChildDirective } from '@shared/classes/order-stepper-child';
import { Order } from '@shared/interfaces/order';
import MapTypeStyle = google.maps.MapTypeStyle;
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent extends OrderStepperChildDirective implements OnInit, OnDestroy {
  mapStyle: MapTypeStyle[] = mapStyle;

  zoom = 11;
  cities: City[];
  coords$: Observable<LatLng | LatLngLiteral>;
  points: Point[];

  @Input() order: Order;
  private pickupPointControl: FormControl;
  private cityControl: FormControl;

  constructor(
    private locationService: LocationService,
    private pointService: PointService,
    private orderService: OrderService,
    private detectorRef: ChangeDetectorRef
  ) {
    super();
  }

  @Input() set locationForm(value: AbstractControl | FormGroup) {
    this.form = value;
    this.cityControl = value.get('city') as FormControl;
    this.pickupPointControl = value.get('pickupPoint') as FormControl;
  }

  ngOnInit(): void {
    this.coords$ = this.locationService.getUserCoords();
    this.locationService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((cities) => {
        this.cities = cities;
        this.detectorRef.markForCheck();
        const citiesName = cities.map((city) => city.name);
        this.cityControl.setValidators(autocompleteValidator(citiesName));
      });

    this.clear();
  }

  ngOnDestroy(): void {}

  citySelected(city: City, event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.coords$ = this.locationService.getCoordsByAddress(city.name);
      this.pointService
        .getPointsFormCity(city.id)
        .pipe(untilDestroyed(this))
        .subscribe((points) => {
          this.points = points;
          this.detectorRef.markForCheck();
          const pointsName = points.map((point) => point.address);
          this.pickupPointControl.setValidators(autocompleteValidator(pointsName));
        });
      this.order.cityId = city;
      this.orderService.orderTrigger(this.order);
    }
  }

  clear(): void {
    this.cityControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      if (value && value.length) {
        this.pickupPointControl.setValue('');
      }
    });
  }

  onAddressSelect(point: Point, event?: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.setPoint(point);
    }
  }

  markerClick(point: Point): void {
    this.cityControl.setValue(point.cityId.name);
    this.pickupPointControl.setValue(point.address);
    this.setPoint(point);
  }

  clearValue(formControlName: string): void {
    this.form.get(formControlName).setValue('');
  }

  test(ev: any): void {
    console.log(ev);
  }

  private setPoint(point: Point): void {
    if (point) {
      this.order = this.reset(this.order, ['pointId', 'cityId']);
      this.order.pointId = point;
      this.orderService.orderTrigger(this.order);
      this.orderService.stepperIndex = this.currentIndex;
      this.coords$ = of(point.coords);
    }
  }
}
