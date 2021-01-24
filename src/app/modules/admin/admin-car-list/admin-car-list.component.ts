import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarListComponent {
  constructor(private router: Router) {}

  selectCar($event: unknown): void {
    localStorage.setItem('car', JSON.stringify($event));
    this.router.navigate(['admin', 'edit', 'car']);
  }
}
