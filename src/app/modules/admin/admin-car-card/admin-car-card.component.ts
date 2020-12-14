import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-car-card',
  templateUrl: './admin-car-card.component.html',
  styleUrls: ['./admin-car-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
