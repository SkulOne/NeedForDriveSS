import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { listItems } from './side-nav-list-item/sidenav-list-items-array';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  items = listItems;
  sidenavOpened: boolean;
  sidenavMode: MatDrawerMode;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  @HostListener('window:resize') setSidenavProperties(): void {
    if (window.innerWidth > 1024) {
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
  }

  ngOnInit(): void {
    this.setSidenavProperties();
  }

  toggle(sidenav: MatDrawer): void {
    sidenav.toggle();
    sidenav._animationStarted.pipe(untilDestroyed(this)).subscribe(() => {
      this.sidenavOpened = sidenav.opened;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {}
}
