import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
    },
    {
      path: 'account-manager',
      component: AccountComponent,
    },
    {
      path: 'category',
      component: CateComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'invoice',
      component: InvoiceComponent,
    },
    {
      path: 'insurrance',
      component: WaranrlyComponent,
    },
    {
      path: 'event',
      component: EventComponent,
    },
    {
      path: 'ware',
      component: WarehouseComponent,
    },
    {
      path: 'input',
      component: InputComponent,
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule),
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
