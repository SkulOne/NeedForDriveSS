import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { InfoComponent } from './components/info/info.component';
import { SliderComponent } from './components/slider/slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    SWIPER_CONFIG,
    SwiperConfigInterface,
    SwiperModule,
} from 'ngx-swiper-wrapper';
import { SlideItemComponent } from './components/slider/slide-item/slide-item.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../components/header/header.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
};

@NgModule({
    declarations: [
        MainPageComponent,
        InfoComponent,
        SliderComponent,
        SlideItemComponent,
        HeaderComponent,
    ],
    exports: [MainPageComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        SwiperModule,
        MatSidenavModule,
        MatButtonModule,
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG,
        },
    ],
})
export class MainPageModule {}
