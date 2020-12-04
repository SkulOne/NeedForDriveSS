import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { OrderComponent } from './modules/order/order.component';
import { OrderSharingComponent } from './modules/order/components/order-sharing/order-sharing.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-info/:id', component: OrderSharingComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
