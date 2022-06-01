import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing-admin.module';

import { PagesComponent } from './pages-admin.component';
import { ProfileModule } from './profile/profile.module';
import { AccountModule } from './account/account.module';
import { CateModule } from './cate/cate.module';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';
import { EventModule } from './seasonEvent/event.module';
import { WarrantlyModule } from './warrantly/warrantly.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { InputModule } from './input/input.module';

@NgModule({
  imports: [
    NbMenuModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ProfileModule,
    AccountModule,
    CateModule,
    ProductModule,
    InvoiceModule,
    EventModule,
    WarrantlyModule,
    WarehouseModule,
    InputModule,
  ],
  declarations: [
    PagesComponent,
    
  ],
})
export class PagesModule {
}
