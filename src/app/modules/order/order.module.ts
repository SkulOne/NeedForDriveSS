import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { LocationComponent } from './components/location/location.component';
import { SharedModule } from '../shared-module/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { OrderPropertiesComponent } from './components/order-properties/order-properties.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    OrderComponent,
    StepperComponent,
    LocationComponent,
    OrderPropertiesComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLs3CudxoCs9C43iKaJqQ31Xg3w89_8G8',
    }),
    HttpClientModule,
    MatStepperModule,
    MatAutocompleteModule,
    SharedModule,
  ],
})
export class OrderModule {}
