import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './modules/main/main-page/main-page.component';
import { OrderComponent } from './modules/main/order/order.component';
import { OrderSharingComponent } from './modules/main/order/components/order-sharing/order-sharing.component';
import { StepperComponent } from './modules/main/order/components/stepper/stepper.component';
import { AdminComponent } from './modules/admin/admin.component';
import { MainComponent } from './modules/main/main.component';
import { AuthorizationComponent } from './modules/admin/auth/authorization.component';
import { AuthorizationGuard } from '@shared/guard/authorization-guard.service';

const mainModuleRoutes: Routes = [
  { path: 'main', component: MainPageComponent },
  {
    path: 'order',
    component: OrderComponent,
    children: [
      { path: ':id', component: OrderSharingComponent },
      { path: '', component: StepperComponent },
    ],
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthorizationGuard],
  },
  { path: 'auth', component: AuthorizationComponent },
  { path: '', component: MainComponent, children: mainModuleRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
