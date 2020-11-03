import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LocationService } from '../../../../shared/services/location/location.service';
import MapTypeStyle = google.maps.MapTypeStyle;
import LatLngLiteral = google.maps.LatLngLiteral;
import { mapStyle } from '../../../../shared/entities/mapStyle';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
    @Input() locationForm: AbstractControl;

    coords: LatLngLiteral;
    mapStyle: MapTypeStyle[] = mapStyle;
    filteredOptions: Observable<string[]>;
    options: string[] = ['One', 'Two', 'Three'];

    constructor(private locationService: LocationService) {}

    ngOnInit(): void {
        this.locationService.getUserCoords().subscribe((userCoords) => {
            this.coords = userCoords;
        });

        this.filteredOptions = this.locationForm.get('city').valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(
            (option) => option.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
