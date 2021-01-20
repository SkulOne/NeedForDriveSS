import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { AuthorizationService } from '@shared/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  logoutTrigger = new Subject<void>();
  logout$ = this.logoutTrigger.asObservable();
  showSpinner: boolean;
  orderLength: number;
  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  logout(): void {
    this.showSpinner = true;
    this.logoutTrigger.next();
  }

  ngOnInit(): void {
    this.logout$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.authorizationService.logout())
      )
      .subscribe(() => {
        this.showSpinner = false;
        this.router.navigate(['/auth']);
      });

    // this.getOrderLength()
    //   .pipe(untilDestroyed(this))
    //   .subscribe((length) => {
    //     console.log(length);
    //     this.orderLength = length;
    //   });
  }

  ngOnDestroy(): void {}

  // getOrderLength(): Observable<number> {
  //   return this.httpBack.getAll('order').pipe(
  //     switchMap((orderArray) => {
  //       return of(orderArray.length);
  //     })
  //   );
  // }
}
