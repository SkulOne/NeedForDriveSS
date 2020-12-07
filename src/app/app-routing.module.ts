import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './modules/main/main-page/main-page.component';
import { OrderComponent } from './modules/main/order/order.component';
import { OrderSharingComponent } from './modules/main/order/components/order-sharing/order-sharing.component';
import { StepperComponent } from './modules/main/order/components/stepper/stepper.component';
import { AdminComponent } from './modules/admin/admin.component';
import { MainComponent } from './modules/main/main.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
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

const routes1: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: '', component: MainComponent, children: routes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes1)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
