import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthorizationComponent } from './auth/authorization.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavListItemComponent } from './side-nav-list-item/sidenav-list-item.component';
import { MatListModule } from '@angular/material/list';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CarImageSettingComponent } from './car-properties-setting/components/car-image-setting/car-image-setting.component';
import { CarPropertiesSettingComponent } from './car-properties-setting/car-properties-setting.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared-module/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { AdminEntityEmptyComponent } from './admin-entity-empty/admin-entity-empty.component';
import { EntityPageComponent } from './entity-page/entity-page.component';
import { EntityListComponent } from './entity-page/entity-list/entity-list.component';
import { EntitySettingsComponent } from './entity-page/entity-settings/entity-settings.component';
import { AdminCarListComponent } from './admin-car-list/admin-car-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderListComponent } from './admin-order/admin-order-list/admin-order-list.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorizationComponent,
    SidenavListItemComponent,
    AdminHeaderComponent,
    CarImageSettingComponent,
    CarPropertiesSettingComponent,
    AdminFooterComponent,
    AdminEntityEmptyComponent,
    EntityPageComponent,
    EntityListComponent,
    EntitySettingsComponent,
    AdminCarListComponent,
    AdminOrderComponent,
    AdminOrderListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MaterialFileInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxMaskModule,
  ],
})
export class AdminModule {}
