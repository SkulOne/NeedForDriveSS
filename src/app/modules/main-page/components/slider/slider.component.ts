import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { slides } from '../../../../shared/entities/slides';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
    config: SwiperOptions = {
        pagination: true,
        navigation: true,
    };
    slides = slides;
    constructor() {}

    ngOnInit(): void {}
}
