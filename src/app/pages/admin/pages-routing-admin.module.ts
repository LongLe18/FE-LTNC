import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { SensorComponent } from './sensor/sensor.component';
// import { RuleComponent } from './rule/rule.component';
// import { BlacklistComponent } from './blacklist/blacklist.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../../@core/auth-guard.service';
// import { AddRuleComponent } from './addrule/addrule.component';
// import { SettingEmailComponent } from './setting-email/setting-email.component';
// import { CNCCardComponent } from './cnc/cnc.component';
// import { LogComponent } from './clogs/log.component';
// import { SettingBackupComponent } from './setting-backup/setting-backup.component';
// import { BackupComponent } from './backup/backup.component';
// import { AIComponent } from './ai/ai.component';
// import { TrackNetworkComponent } from './trackingNetwork/track.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
    },
  //   {
  //     path: 'tracking-network',
  //     component: DashboardComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'sensor',
  //     component: SensorComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path:'rule',
  //     component: RuleComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'blacklist',
  //     component: BlacklistComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'ai',
  //     component: AIComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'trackNetwork',
  //     component: TrackNetworkComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'addrule',
  //     component: AddRuleComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'settingrule',
  //     component: SettingEmailComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'cnc-detection',
  //     component: CNCCardComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'log',
  //     component: LogComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'setting-backup',
  //     component: SettingBackupComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'backup',
  //     component: BackupComponent,
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'maps',
  //     loadChildren: () => import('./maps/maps.module')
  //       .then(m => m.MapsModule),
  //   },
  //   {
  //     path: 'user',
  //     loadChildren: () => import('./account/account.module')
  //       .then(m => m.TablesModule),
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'profile',
  //     loadChildren: () => import('./profile/profile.module')
  //       .then(m => m.ProfileModule),
  //     canActivate: [AuthGuard],
  //   },{
  //     path: 'setting',
  //     loadChildren: () => import ('./setting-threat/setting-threat.module')
  //       .then(m => m.SettingThreatModule),
  //     canActivate: [AuthGuard],
  //   },
  //   {
  //     path: 'miscellaneous',
  //     loadChildren: () => import('./miscellaneous/miscellaneous.module')
  //       .then(m => m.MiscellaneousModule),
  //   },
  //   {
  //     path: '',
  //     redirectTo: 'dashboard',
  //     pathMatch: 'full',
  //   },
  //   {
  //     path: '**',
  //     component: NotFoundComponent,
  //   },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
