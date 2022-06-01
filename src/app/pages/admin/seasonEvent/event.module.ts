import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbDialogModule,
  NbInputModule,
} from '@nebular/theme';

import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';

import { EventComponent } from './event.component';
import { AddSeasonComponent } from './addSeason/add.component';
import { EditSeasonComponent } from './editSeason/edit.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    FormsModule,
    ngFormsModule,
    CommonModule,
    NbDialogModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    NbInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    EventComponent,
    AddSeasonComponent,
    EditSeasonComponent
  ],
})
export class EventModule { }