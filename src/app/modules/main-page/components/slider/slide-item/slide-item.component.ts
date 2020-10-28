import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Slide } from '../../../../../shared/interfaces/slide';

@Component({
    selector: 'app-slide-item',
    templateUrl: './slide-item.component.html',
    styleUrls: ['./slide-item.component.scss'],
})
export class SlideItemComponent implements OnInit {
    @Input() slide: Slide;

    constructor() {}

    @HostBinding('style') get getCursor(): string {
        return `background-image: ${this.slide.img};
                background-size: cover;
                background-position: center;`;
    }

    ngOnInit(): void {}
}
