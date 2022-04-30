import { NgModule } from '@angular/core';

import { InsurranceComponent } from './insurrance.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatDialogModule,
  ],
  declarations: [
    InsurranceComponent,
  ],
})
export class InsurranceModule { }
