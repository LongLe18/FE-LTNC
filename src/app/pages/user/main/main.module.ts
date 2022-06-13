import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';

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

import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SearchProductComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
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
    ThemeModule,
    ngFormsModule,
  ],
  declarations: [
    MainComponent,
    SliderComponent,
    CategoryComponent,
    ProductComponent,
    SearchProductComponent,
  ],
})
export class MainModule { }
