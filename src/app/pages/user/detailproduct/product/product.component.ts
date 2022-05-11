import {Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';


@Component({
  selector: 'ngx-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private serviceProduct: ProductData, private toastrService: NbToastrService,
      ) {          
  }
  
  products;
  productdetail;
  imageDetail;
  @Input() idProduct = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes["idProduct"] != undefined) {
      this.serviceProduct.getProduct(changes["idProduct"].currentValue).subscribe(res => {
        if (res["status"] == "SUCCESS") {
          this.toastrService.show('Lấy chi tiết sản phẩm thành công', 'Thành công', { status: 'success' });
          this.productdetail = res["data"][0];
          console.log(this.productdetail);
        }
      }, error => this.toastrService.show('Lấy chi tiết sản phẩm không thành công', 'Lỗi', { status: 'danger' }))
      console.log(changes["idProduct"].currentValue)

      this.serviceProduct.getImageDetailProduct(changes["idProduct"].currentValue).subscribe(res => {
        this.imageDetail = res['data'][0];
        console.log(res['data'][0]);
      })
    }
  }

  ngOnInit(): void {
    this.serviceProduct.getListProductByPage(0, 10).subscribe(res => {
      this.products = res['data'];
    })
  }
}
