import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Point } from '../../../../shared/interfaces/point';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPropertiesComponent {
  @Input() point: Point;
  constructor() {}
}
