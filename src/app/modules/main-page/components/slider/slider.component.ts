import {ChangeDetectionStrategy, Component} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { slides } from './slides';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SliderComponent{
    config: SwiperOptions = {
        pagination: true,
        navigation: true,
    };
    slides = slides;
    constructor() {}

}
