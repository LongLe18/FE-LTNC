import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbDatepickerModule,
  NbSearchModule,
} from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../../@theme/theme.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    NbDatepickerModule,
    MatDatepickerModule,
    NbSearchModule,
    NgxChartsModule,
    ChartModule,
    NbMomentDateModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  declarations: [
    DashboardComponent,
    DatepickerComponent,
  ],
})
export class DashboardModule { }
