import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { LocationComponent } from './components/stepper/location/location.component';
import { SharedModule } from '../../shared-module/shared.module';
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
import { LocationService } from '@shared/services/location.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarModelListComponent } from './components/stepper/car-model-list/car-model-list.component';
import { CarModelComponent } from './components/stepper/car-model-list/car-model/car-model.component';
import { MatCardModule } from '@angular/material/card';
import { AdditionallyComponent } from './components/stepper/additionally/additionally.component';
import { NgxMaskModule } from 'ngx-mask';
import { OrderInfoComponent } from './components/stepper/order-info/order-info.component';
import { OrderListItemComponent } from './components/order-properties/order-list-item/order-list-item.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderSharingComponent } from './components/order-sharing/order-sharing.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    OrderComponent,
    StepperComponent,
    LocationComponent,
    OrderPropertiesComponent,
    CarModelListComponent,
    CarModelComponent,
    AdditionallyComponent,
    OrderInfoComponent,
    OrderListItemComponent,
    ConfirmDialogComponent,
    OrderSharingComponent,
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
    MatSnackBarModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    MatDialogModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  providers: [LocationService, ErrorHandlerService],
})
export class OrderModule {}
