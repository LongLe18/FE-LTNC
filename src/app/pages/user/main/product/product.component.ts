import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';


@Component({
  selector: 'ngx-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private serviceProduct: ProductData, private toastrService: NbToastrService) {  }
  

  length;
  pageIndex = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 30];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() idCate = '';
  @Input() idBrand = '';

  products;
  productsByCate = '';
  productsByBrand = '';
  saleProducts;
  salefastlyProducts;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["idCate"] != undefined) {
      this.serviceProduct.getListProductByCategory(changes["idCate"].currentValue, 0, 10).subscribe(res => {
        if (res["status"] == "SUCCESS") {
          this.toastrService.show('Lấy sản phẩm thành công', 'Thành công', { status: 'success' });
          this.productsByCate = res["data"];
          console.log(this.productsByCate);
        }
      }, error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' }))
      console.log(changes["idCate"].currentValue)
    }
    if (changes["idBrand"] != undefined) {
      this.serviceProduct.getListProductByBrand(changes["idBrand"].currentValue, 0, 10).subscribe(res => {
        if (res["status"] == "SUCCESS") {
          this.toastrService.show('Lấy sản phẩm thành công', 'Thành công', { status: 'success' });
          this.productsByBrand = res["data"];
          console.log(this.productsByBrand);
        }
      }, error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' }))
      console.log(changes["idBrand"].currentValue)
    }

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

  ngOnInit(): void {
    this.serviceProduct.getListProduct().subscribe(res => {
      this.length = res['data'].length;
    })

    this.serviceProduct.getListProductByPage(this.pageIndex, this.pageSize).subscribe(res => {
      this.products = res['data'];
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    ) 

    this.serviceProduct.getListSaleProducts().subscribe(res => {
      this.saleProducts = res['data'];
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    )

    this.serviceProduct.getListProductByPage(this.pageIndex + 1, this.pageSize - 5).subscribe(res => {
      this.salefastlyProducts = res['data'];
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    )
  }
}
