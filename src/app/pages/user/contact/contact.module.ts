import { NgModule } from '@angular/core';

import { ContactComponent } from './contact.component';
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
    ContactComponent,
  ],
})
export class ContactModule { }
