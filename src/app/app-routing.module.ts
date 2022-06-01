import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/auth-guard.service';

export const routes: Routes = [
  {
    path: 'pages-admin',
    loadChildren: () => import('./pages/admin/pages-admin.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages-user',
    loadChildren: () => import('./pages/user/pages-user.module')
      .then(m => m.PagesUserModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'pages-user/main', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'pages-user/main', pathMatch: 'prefix' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
