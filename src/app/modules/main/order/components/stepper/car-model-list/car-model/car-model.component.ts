import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ICar } from '@shared/interfaces/ICar';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarModelComponent {
  @Input() carModel: ICar;
  constructor() {}
}
