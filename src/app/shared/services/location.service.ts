import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { City } from '../interfaces/city';
import LatLngLiteral = google.maps.LatLngLiteral;
import GeocoderResult = google.maps.GeocoderResult;
import LatLng = google.maps.LatLng;
import { ErrorHandlerService } from './error-handler.service';
import { HttpBackService } from '@shared/services/http-back.service';

interface GeocoderResponseArray {
  results: GeocoderResult[];
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  setCity$ = new Subject<City>();
  private readonly googleMapKey = 'key=AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8';
  private readonly url = 'https://maps.googleapis.com/maps/api/';

  constructor(
    private httpBack: HttpBackService,
    private errorHandler: ErrorHandlerService,
    private httpClient: HttpClient
  ) {}

  getUserCity(): Observable<string> {
    return this.getUserCoords().pipe(
      catchError((err) => this.errorHandler.handleHttpError(err)),
      mergeMap((coords) => {
        return this.requestCity(coords).pipe(
          map((locationUser) => locationUser.address_components[0].long_name)
        );
      })
    );
  }

  getUserCoords(): Observable<LatLngLiteral> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            const coords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            observer.next(coords);
          },
          (error: PositionError) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation not available');
      }
    });
  }

  getAll(): Observable<City[]> {
    return this.httpBack.getAll<City>('city');
  }

  getCoordsByAddress(address: string): Observable<LatLng> {
    return this.httpClient
      .get<GeocoderResponseArray>(`${this.url}geocode/json?address=${address}&${this.googleMapKey}`)
      .pipe(
        catchError((err) => this.errorHandler.handleHttpError(err)),
        map((result) => result.results[0].geometry.location)
      );
  }

  private requestCity(coords: LatLngLiteral): Observable<GeocoderResult> {
    return this.httpClient
      .get<GeocoderResponseArray>(
        `${this.url}geocode/json?${this.googleMapKey}&latlng=${coords.lat},${coords.lng}&result_type=locality`
      )
      .pipe(
        catchError((err) => this.errorHandler.handleHttpError(err)),
        map((result) => result.results[0])
      );
  }
}
