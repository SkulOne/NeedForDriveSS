import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { listItems } from './side-nav-list-item/sidenav-list-items-array';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  items = listItems;
  sidenavOpened: boolean;
  sidenavMode: MatDrawerMode;
  constructor() {}

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
}
