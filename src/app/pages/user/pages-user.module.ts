import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { MainModule } from './main/main.module';
import { ProfileModule } from './profile/profile.module';
import { ContactModule } from './contact/contact.module';
import { InsurranceModule } from './insurrance/insurrace.module';
import { DeTailProductModule } from './detailproduct/detailproduct.module';

import { PagesRoutingModule } from './pages-routing-user.module';

import { PagesUserComponent } from './pages-user.component';

@NgModule({
  imports: [
    NbMenuModule,
    PagesRoutingModule,
    ThemeModule,
    MainModule,
    ProfileModule,
    ContactModule,
    InsurranceModule,
    DeTailProductModule,
  ],
  declarations: [
    PagesUserComponent,
  ],
})
export class PagesUserModule {
}
