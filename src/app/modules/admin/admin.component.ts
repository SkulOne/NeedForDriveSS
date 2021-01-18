import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { listItems } from './side-nav-list-item/sidenav-list-items-array';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SidenavListItem } from './side-nav-list-item/sidenav-list-item';
import { RouterDataService } from '@shared/services/router-data.service';
import { Router } from '@angular/router';

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
  constructor(private routerData: RouterDataService, public router: Router) {}

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
    this.routerData.data = item.data;
    this.router.navigate([item.routerLink]);
  }

  ngOnInit(): void {
    this.setSidenavProperties();
  }
}
