import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
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
    CartComponent,
  ],
})
export class CartModule { }
