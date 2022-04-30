import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
// import { SensorModule } from './sensor/sensor.module';
// import { RuleModule } from './rule/rule.module';
// import { AIModule } from './ai/ai.module';
// import { BlackListModule } from './blacklist/blaclist.module';
// import { LogModule } from './clogs/log.module';
// import { SettingBackupModule } from './setting-backup/setting-backup.module';
import { PagesRoutingModule } from './pages-routing-admin.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
// import { AddRuleModule } from './addrule/addrule.module';
// import { SettingEmailModule } from './setting-email/setting-email.module';
// import { CNCModule } from './cnc/cnc.module';
// import { BackupModule } from './backup/backup.module';
// import { TrackNetWorkModule } from './trackingNetwork/track.module';

import { PagesComponent } from './pages-admin.component';

@NgModule({
  imports: [
    NbMenuModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    // ECommerceModule,
    // MiscellaneousModule,
    // SensorModule,
    // RuleModule,
    // AIModule,
    // AddRuleModule,
    // SettingEmailModule,
    // CNCModule,
    // BlackListModule,
    // LogModule,
    // SettingBackupModule,
    // BackupModule,
    // TrackNetWorkModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
