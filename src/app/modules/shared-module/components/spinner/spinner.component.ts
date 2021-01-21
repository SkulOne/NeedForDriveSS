import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  @Input() show: boolean;
  @Input() color: ThemePalette;
  @Input() diameter = 100;

  constructor() {}

  ngOnInit(): void {}
}
