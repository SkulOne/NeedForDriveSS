import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './modules/main-page/main-page.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideBarContentComponent } from './components/side-bar-content/side-bar-content.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OrderModule } from './modules/order/order.module';

@NgModule({
    declarations: [AppComponent, SideBarContentComponent, SideBarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainPageModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSidenavModule,
        OrderModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
