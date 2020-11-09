import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { ResponseResult } from '../interfaces/response-result';
import { City } from '../interfaces/city';
import LatLngLiteral = google.maps.LatLngLiteral;
import GeocoderResult = google.maps.GeocoderResult;
import LatLng = google.maps.LatLng;

interface GeocoderResponseArray {
  results: GeocoderResult[];
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly googleMapKey = 'key=AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8';
  private readonly url = 'https://maps.googleapis.com/maps/api/';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      Authorization: 'Bearer 52efbe08228671240494f537f2486bc109a637b4',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getUserCity(): Observable<string> {
    return this.getUserCoords().pipe(
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

  getAllCity(): Observable<City[]> {
    return this.httpClient
      .get<ResponseResult<City>>(
        'http://api-factory.simbirsoft1.com/api/db/city',
        this.httpOptions
      )
      .pipe(map((result) => result.data));
  }

  getCoordsByAddress(address: string): Observable<LatLng> {
    return this.httpClient
      .get<GeocoderResponseArray>(
        `${this.url}geocode/json?address=${address}&${this.googleMapKey}`
      )
      .pipe(map((result) => result.results[0].geometry.location));
  }

  private requestCity(coords: LatLngLiteral): Observable<GeocoderResult> {
    return this.httpClient
      .get<GeocoderResponseArray>(
        `${this.url}geocode/json?${this.googleMapKey}&latlng=${coords.lat},${coords.lng}&result_type=locality`
      )
      .pipe(map((result) => result.results[0]));
  }
}
