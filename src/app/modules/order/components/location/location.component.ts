import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LocationService } from '../../../../shared/services/location.service';
import { mapStyle } from './mapStyle';
import { Observable, of } from 'rxjs';
import { PointService } from '../../../../shared/services/point.service';
import { City } from '../../../../shared/interfaces/city';
import { Point } from '../../../../shared/interfaces/point';
import { OrderService } from '../../../../shared/services/order.service';
import MapTypeStyle = google.maps.MapTypeStyle;
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatOptionSelectionChange } from '@angular/material/core';
import { autocompleteValidator } from './validators';

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
  cities$: Observable<City[]>;
  points$: Observable<Point[]>;
  zoom = 11;

  constructor(
    private locationService: LocationService,
    private pointService: PointService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.coords$ = this.locationService.getUserCoords();

    this.cities$ = this.locationService.getAllCity();
    this.cities$.pipe(untilDestroyed(this)).subscribe((cities) => {
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
        if (value.length) {
          this.locationForm.get('pickupPoint').setValue('');
        }
      });
  }

  addressSelect(point: Point): void {
    this.orderService.point.next(point);
    this.coords$ = of(point.coords);
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
}
