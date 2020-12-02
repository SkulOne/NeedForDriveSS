import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { LocationService } from '../../../../shared/services/location.service';
import { mapStyle } from './mapStyle';
import { Observable, of, Subscription } from 'rxjs';
import { PointService } from '../../../../shared/services/point.service';
import { City } from '../../../../shared/interfaces/city';
import { Point } from '../../../../shared/interfaces/point';
import { OrderService } from '../../../../shared/services/order.service';
import MapTypeStyle = google.maps.MapTypeStyle;
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatOptionSelectionChange } from '@angular/material/core';
import { autocompleteValidator } from '../../../../shared/validators';
import { Order } from '../../../../shared/interfaces/order';
import { OrderStepperChild } from '../../../../shared/order-stepper-child';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent extends OrderStepperChild implements OnInit, OnDestroy {
  mapStyle: MapTypeStyle[] = mapStyle;

  zoom = 11;
  cities$: City[];
  coords$: Observable<LatLng | LatLngLiteral>;
  points$: Observable<Point[]>;
  private _subscription: Subscription;
  private pickupPointControl: FormControl;
  private cityControl: FormControl;

  constructor(
    private locationService: LocationService,
    private pointService: PointService,
    private orderService: OrderService
  ) {
    super(orderService);
  }
  @Input() set locationForm(value: AbstractControl | FormGroup) {
    this.form = value;
    this.cityControl = value.get('city') as FormControl;
    this.pickupPointControl = value.get('pickupPoint') as FormControl;
  }

  ngOnInit(): void {
    this.coords$ = this.locationService.getUserCoords();

    this.locationService
      .getAllCity()
      .pipe(untilDestroyed(this))
      .subscribe((cities) => {
        this.cities$ = cities;
        const citiesName = cities.map((city) => city.name);
        this.cityControl.setValidators(autocompleteValidator(citiesName));
      });

    this.clear();
  }

  citySelected(city: City, event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.coords$ = this.locationService.getCoordsByAddress(city.name);
      this.points$ = this.pointService.getPointsFormCity(city.id);
      this.points$.pipe(untilDestroyed(this)).subscribe((points) => {
        const pointsName = points.map((point) => point.address);
        this.pickupPointControl.setValidators(autocompleteValidator(pointsName));
      });
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

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private setPoint(point: Point): void {
    this.getOrderObservable().subscribe((value: Order) => {
      value.pointId = point;
      this.orderService.orderTrigger(value);
      this._subscription = this.reset(['pointId']);
    });
    this.orderService.stepperIndex = this.currentIndex;
    this.coords$ = of(point.coords);
  }
}
