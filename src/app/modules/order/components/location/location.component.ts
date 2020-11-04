import { Component, Input, OnInit} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LocationService } from '../../../../shared/services/location.service';
import { mapStyle } from './mapStyle';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PointService } from '../../../../shared/services/point.service';
import { City } from '../../../../shared/interfaces/city';
import { Point } from '../../../../shared/interfaces/point';
import MapTypeStyle = google.maps.MapTypeStyle;
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLngBounds = google.maps.LatLngBounds;
import LatLng = google.maps.LatLng;
import {OrderService} from '../../../../shared/services/order.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() locationForm: AbstractControl;
  mapStyle: MapTypeStyle[] = mapStyle;

  coords: LatLng | LatLngLiteral;
  bounds: LatLngBounds;
  filteredOptions: Observable<City[]>;
  filteredOptionsPoints: Observable<Point[]>;

  private cities: City[];
  private points: Point[];
  pointCoords: LatLngLiteral[] = [];

  constructor(
    private locationService: LocationService,
    private pointService: PointService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.locationService.getUserCoords().subscribe((userCoords) => {
      this.coords = userCoords;
    });

    this.locationService.getCityAll().subscribe((value) => {
      this.cities = value;
      this.filteredOptions = this.locationForm.get('city').valueChanges.pipe(
        startWith(''),
        map((values) => {
          return this.filter(values);
        })
      );
    });
  }

  citySelected(city: City): void {
    this.locationService.getCityByName(city.name).subscribe((coords) => {
      this.coords = coords;
    });

    this.getPoints(city);
  }

  private getPoints(city: City): void {
    this.pointService.getPointsFormCity(city.id).subscribe((points) => {
      this.points = points;
      this.points.map((point) => {
        this.locationService
          .getCoordsByAddress(point.address)
          .subscribe((value) => this.pointCoords.push(value));
      });
      console.log(this.pointCoords);
      this.filteredOptionsPoints = this.locationForm
        .get('pickupPoint')
        .valueChanges.pipe(
          startWith(''),
          map((values) => {
            return this.filterPoints(values);
          })
        );
    });
  }

  private filter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.cities.filter((option) => {
      return option.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }

  private filterPoints(value: string): any {
    const filterValue = value.toLowerCase();
    return this.points.filter((option) => {
      return option.address.toLowerCase().indexOf(filterValue) > -1;
    });
  }

  addressSelect(point: Point): void {
    this.orderService.address.next(point.address);
  }
}
