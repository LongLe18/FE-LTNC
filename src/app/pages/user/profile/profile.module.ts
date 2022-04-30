import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ProfileComponent,
  ],
})
export class ProfileModule { }
