import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private readonly googleMapKey =
        'key=AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8';
    private readonly url = 'https://maps.googleapis.com/maps/api/';

    constructor(private httpClient: HttpClient) {}

    getUserCity(): Observable<string> {
        return this.getUserCoords().pipe(
            mergeMap((coords) => {
                return this.requestCity(coords).pipe(
                    map((locationUser) => {
                        return locationUser.results[0].address_components[0]
                            .long_name;
                    })
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

    // todo: не забудь убрать any
    private requestCity(coords: LatLngLiteral): Observable<any> {
        return this.httpClient.get(
            `${this.url}geocode/json?${this.googleMapKey}&latlng=${coords.lat},${coords.lng}&result_type=locality`
        );
    }
}
