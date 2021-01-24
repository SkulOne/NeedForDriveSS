import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
