import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesUserComponent } from './pages-user.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../../@core/auth-guard.service';
import { ContactComponent } from './contact/contact.component';
import { InsurranceComponent } from './insurrance/insurrance.component';

const routes: Routes = [{
  path: '',
  component: PagesUserComponent,
  children: [
    {
      path: 'main',
      component: MainComponent,
    },
    {
      path: 'product/:id',
      component: MainComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'insurrance',
      component: InsurranceComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
