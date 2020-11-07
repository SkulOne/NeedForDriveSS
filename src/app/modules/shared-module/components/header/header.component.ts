import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from '../../../../shared/services/location.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    faMapMarkerAlt = faMapMarkerAlt;
    userCity: Observable<string>;
    constructor(private locationService: LocationService) {}

    ngOnInit(): void {
        this.userCity = this.locationService.getUserCity();
    }
}
