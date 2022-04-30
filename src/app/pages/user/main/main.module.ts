import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
  ],
  declarations: [
    MainComponent,
    SliderComponent,
    CategoryComponent,
    ProductComponent,
  ],
})
export class MainModule { }
