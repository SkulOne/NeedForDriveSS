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
import { AdminCarCardComponent } from './admin-car-card/admin-car-card.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthorizationComponent,
    SidenavListItemComponent,
    AdminHeaderComponent,
    AdminCarCardComponent,
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
  ],
})
export class AdminModule {}
