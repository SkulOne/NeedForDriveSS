import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SideBarContentComponent } from './components/side-bar-content/side-bar-content.component';
import { RouterModule } from '@angular/router';
import { AutocompletePipe } from '@shared/pipes/autocomplete.pipe';
import { FilterCarPipe } from '@shared/pipes/filter-car.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from './components/confrim-dialog/confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CellValuePipe } from '@shared/pipes/cell-value.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    SideBarContentComponent,
    AutocompletePipe,
    FilterCarPipe,
    CellValuePipe,
    SpinnerComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    SideBarContentComponent,
    SideBarComponent,
    AutocompletePipe,
    FilterCarPipe,
    SpinnerComponent,
    CellValuePipe,
    ConfirmDialogComponent,
  ],
})
export class SharedModule {}
