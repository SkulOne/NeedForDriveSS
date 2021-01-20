import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { listItems } from './side-nav-list-item/sidenav-list-items-array';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavListItem } from '@shared/interfaces/sidenav-list-item';

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
  constructor(public router: Router) {}

  @HostListener('window:resize') setSidenavProperties(): void {
    if (window.innerWidth > 1024) {
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
  }

  pageNavigate(item: SidenavListItem): void {
    this.router.navigate([item.routerLink]);
  }

  ngOnInit(): void {
    this.setSidenavProperties();
  }
}
