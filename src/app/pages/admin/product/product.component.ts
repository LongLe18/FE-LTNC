import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../@core/data/product';
import { AddProductComponent } from './addProduct/add.component';
import { EditProductComponent } from './editProduct/edit.component';

@Component({
    selector: 'ngx-product',
    styleUrls: ['./product.component.scss'],
    templateUrl: './product.component.html',
  })
export class ProductComponent implements OnInit {
  constructor(private serviceProduct: ProductData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  products;
  length;

  pageIndex = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 30];

  openAddProduct() {
    this.dialogService.open(AddProductComponent)
      .onClose.subscribe(res => {
        if (res == true) {
          this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
            this.products = res['data'];
          }, 
            error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
          ) 
        }
      });
  }

  openEditProduct(id) {
    const dialogRef = this.dialog.open(EditProductComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
          this.products = res['data'];
        }, 
          error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
        ) 
      }
    });
  }

  ngOnInit(): void {
    this.serviceProduct.getListProduct().subscribe(res => {
      this.length = res['data'].length;
    })

    this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
      this.products = res['data'];
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    ) 
  }

  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    console.log(this.pageIndex, this.pageSize)
    this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
      this.products = res['data'];
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    ) 
  }

  onDeleCate(id) {
    const ask = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không ? ')
    if (ask) {
      this.serviceProduct.deleteProduct(id).subscribe(res => {
        if (res.status == "SUCCESS") {
          this.toastrService.show('Xóa sản phẩm thành công', 'Thành công', { status: 'success' });
          this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
            this.products = res['data'];
          }, 
            error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
          ) 
        }
      }, error => this.toastrService.show('Xóa sản phẩm không thành công ' + 'Sản phẩm này liên quan tới hóa đơn khác', 'Lỗi', { status: 'danger' }))
    }
  }
}
