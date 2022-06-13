import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../@core/data/product';
import { MatPaginator } from '@angular/material/paginator';
import { ExportService } from '../../../@core/mock/export.service';

@Component({
    selector: 'ngx-warehouse',
    styleUrls: ['./warehouse.component.scss'],
    templateUrl: './warehouse.component.html',
  })
export class WarehouseComponent implements OnInit {
  constructor(private serviceProduct: ProductData, private toastrService: NbToastrService,
    private exportService: ExportService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  products;
  length;

  pageIndex = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 30];

  

  ngOnInit(): void {
    this.getWarehouse();
  }

  getWarehouse() {
    this.serviceProduct.getListProduct().subscribe(res => {
        this.length = res['data'].length;
    })
  
    this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
        this.products = res['data'];
    console.log(this.products)
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

  export() {
    this.exportService.exportExcel(this.products, 'ThongKeTonKho');
  }
}
