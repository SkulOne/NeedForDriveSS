import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './modules/main/main-page/main-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './modules/shared-module/shared.module';
import { OrderModule } from './modules/main/order/order.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoorsInterceptor } from './shared/interceptors/coors.interceptor';
import { DefaultHeaderBackendInterceptor } from './shared/interceptors/default-header-backend.interceptor';
import { AdminComponent } from './modules/admin/admin.component';
import { MainComponent } from './modules/main/main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, AdminComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    SharedModule,
    OrderModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultHeaderBackendInterceptor,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
