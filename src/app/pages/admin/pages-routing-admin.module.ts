import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../@core/auth-guard.service';
import { AccountComponent } from './account/account.component';
import { CateComponent } from './cate/cate.component';
import { ProductComponent } from './product/product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EventComponent } from './seasonEvent/event.component';
import { WaranrlyComponent } from './warrantly/warrantly.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'account-manager',
      component: AccountComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'category',
      component: CateComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'product',
      component: ProductComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'invoice',
      component: InvoiceComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'insurrance',
      component: WaranrlyComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'event',
      component: EventComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'ware',
      component: WarehouseComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'input',
      component: InputComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule),
      canActivate: [AuthGuard],
    },
    {
      path: '**',
      redirectTo: 'account-manager',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
