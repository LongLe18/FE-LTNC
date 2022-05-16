import { NgModule } from '@angular/core';

import { CheckOutComponent } from './checkout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    CheckOutComponent,
  ],
})
export class CheckOutModule { }
