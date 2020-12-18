import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
