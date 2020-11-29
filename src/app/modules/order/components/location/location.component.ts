import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
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
import { take } from 'rxjs/operators';
import { OrderStepperChild } from '../../../../shared/order-stepper-child.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent extends OrderStepperChild implements OnInit, OnDestroy {
  @Input() locationForm: AbstractControl;
  mapStyle: MapTypeStyle[] = mapStyle;

  zoom = 11;
  cities$: City[];
  coords$: Observable<LatLng | LatLngLiteral>;
  points$: Observable<Point[]>;
  private _subscription: Subscription;

  constructor(
    private locationService: LocationService,
    private pointService: PointService,
    private orderService: OrderService
  ) {
    super(orderService);
  }

  ngOnInit(): void {
    this.coords$ = this.locationService.getUserCoords();

    this.locationService
      .getAllCity()
      .pipe(untilDestroyed(this))
      .subscribe((cities) => {
        this.cities$ = cities;
        const citiesName = cities.map((city) => city.name);
        this.locationForm.get('city').setValidators(autocompleteValidator(citiesName));
      });

    this.clear();
  }

  formError(formControlName: string): ValidationErrors | null {
    return this.locationForm.get(formControlName).errors;
  }

  citySelected(city: City, event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.coords$ = this.locationService.getCoordsByAddress(city.name);
      this.points$ = this.pointService.getPointsFormCity(city.id);
      this.points$.pipe(untilDestroyed(this)).subscribe((points) => {
        const pointsName = points.map((point) => point.address);
        this.locationForm.get('pickupPoint').setValidators(autocompleteValidator(pointsName));
      });
    }
  }

  clear(): void {
    this.locationForm
      .get('city')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value && value.length) {
          this.locationForm.get('pickupPoint').setValue('');
        }
      });
  }

  onAddressSelect(point: Point, event?: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.setPoint(point);
    }
  }

  markerClick(point: Point): void {
    this.locationForm.get('city').setValue(point.cityId.name);
    this.locationForm.get('pickupPoint').setValue(point.address);
    this.setPoint(point);
  }

  clearValue(formControlName: string): void {
    this.locationForm.get(formControlName).setValue('');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private setPoint(point: Point): void {
    this.orderService.orderBehavior
      .asObservable()
      .pipe(take(1))
      .subscribe((value: Order) => {
        value.pointId = point;
        this.orderService.orderBehavior.next(value);
        this._subscription = this.reset(this.locationForm, ['pointId']);
      });
    this.coords$ = of(point.coords);
  }
}
