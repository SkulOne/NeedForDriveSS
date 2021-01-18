import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityPageComponent {
  entity: unknown;
  constructor() {}
}
