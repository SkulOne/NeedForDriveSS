import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { slides } from './slides';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent{
    config: SwiperOptions = {
        pagination: true,
        navigation: true,
    };
    slides = slides;
    constructor() {}

}
