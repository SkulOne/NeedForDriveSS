import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthorizationComponent } from './auth/authorization.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminComponent, AuthorizationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule],
})
export class AdminModule {}
