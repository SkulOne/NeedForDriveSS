import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { listItems } from './side-nav-list-item/sidenav-list-items-array';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  items = listItems;
  constructor() {}

  ngOnInit(): void {}
}
