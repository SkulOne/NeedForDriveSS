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
  // tslint:disable-next-line:no-output-native todo Убери после шаринга
  @Output() select = new EventEmitter();
  @Output() create = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
