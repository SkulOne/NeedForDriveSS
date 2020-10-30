import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { InfoComponent } from './components/info/info.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
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

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
};

@NgModule({
    declarations: [
        MainPageComponent,
        InfoComponent,
        SideBarComponent,
        SliderComponent,
        SlideItemComponent,
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
