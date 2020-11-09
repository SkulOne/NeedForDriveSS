import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Slide } from './slide';

@Component({
  selector: 'app-slide-item',
  templateUrl: './slide-item.component.html',
  styleUrls: ['./slide-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideItemComponent {
  @Input() slide: Slide;

  constructor() {}

  @HostBinding('style') get getCursor(): string {
    return `background-image: ${this.slide.img};
                background-size: cover;
                background-position: center;`;
  }
}
