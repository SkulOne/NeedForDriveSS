import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { AuthorizationService } from '@shared/services/authorization.service';
import { Router } from '@angular/router';
import { OrderService } from '@shared/services/order.service';
import { pages } from '../side-nav-list-item/sidenav-list-items-array';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SidenavListItem } from '@shared/interfaces/sidenav-list-item';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  logoutTrigger = new Subject<void>();
  notifyTrigger$ = new Subject<void>();
  showLogoutSpinner: boolean;
  showNotifySpinner = true;
  orderLength: number;
  routes = pages;
  searchRoutesForm: FormGroup;

  private logout$ = this.logoutTrigger.asObservable();
  private notify$ = this.notifyTrigger$.asObservable();

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private orderService: OrderService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  logout(): void {
    this.showLogoutSpinner = true;
    this.logoutTrigger.next();
  }

  ngOnInit(): void {
    this.logout$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.authorizationService.logout())
      )
      .subscribe(() => {
        this.showLogoutSpinner = false;
        this.router.navigate(['/auth']);
      });

    this.orderService
      .getNewOrders()
      .pipe(untilDestroyed(this))
      .subscribe((newOrdersLength) => {
        this.orderLength = newOrdersLength;
        this.showNotifySpinner = false;
        this.changeDetectorRef.detectChanges();
      });

    this.notify$.pipe(untilDestroyed(this)).subscribe(() => {
      this.router.navigate(['/admin', 'list', 'order'], {
        queryParams: {
          orderStatusId: 'new',
        },
      });
    });

    this.initForm();
  }

  ngOnDestroy(): void {}

  initForm(): void {
    this.searchRoutesForm = this.formBuilder.group({ search: null });
  }

  routeSelected(route: SidenavListItem, $event: MatOptionSelectionChange): void {
    if ($event.isUserInput) {
      this.router.navigate(route.routerLink.split('/'));
    }
  }
}
