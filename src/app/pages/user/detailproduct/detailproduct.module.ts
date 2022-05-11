import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { DetailProductComponent } from './detailproduct.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatTabsModule,
  ],
  declarations: [
    DetailProductComponent,
    CategoryComponent,
    ProductComponent,
  ],
})
export class DeTailProductModule { }
