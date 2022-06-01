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

import { ProductComponent } from './product.component';
import { AddProductComponent } from './addProduct/add.component';
import { EditProductComponent } from './editProduct/edit.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';


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
    MatPaginatorModule,
  ],
  declarations: [
    ProductComponent,
    AddProductComponent,
    EditProductComponent
  ],
})
export class ProductModule { }