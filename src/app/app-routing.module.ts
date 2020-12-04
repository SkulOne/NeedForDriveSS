import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { OrderComponent } from './modules/order/order.component';
import { OrderSharingComponent } from './modules/order/components/order-sharing/order-sharing.component';
import { StepperComponent } from './modules/order/components/stepper/stepper.component';

const orderChild: Routes = [
  { path: ':id', component: OrderSharingComponent },
  { path: '', component: StepperComponent },
];
const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'order', component: OrderComponent, children: orderChild },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
