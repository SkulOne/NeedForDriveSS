import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-admin-entity-empty',
  templateUrl: './admin-entity-empty.component.html',
  styleUrls: ['./admin-entity-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEntityEmptyComponent implements OnInit {
  @Input() hasSelectEvent: boolean;
  @Output() selectEntity = new EventEmitter();
  @Output() create = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
