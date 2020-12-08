import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from '../../../../shared/services/location.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faMapMarkerAlt = faMapMarkerAlt;
  userCity: string;
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.setCity$
      .pipe(
        switchMap((city) => {
          return city ? of(city.name) : this.locationService.getUserCity();
        }),
        untilDestroyed(this)
      )
      .subscribe((value) => {
        this.userCity = value;
      });
  }

  ngOnDestroy(): void {}
}
