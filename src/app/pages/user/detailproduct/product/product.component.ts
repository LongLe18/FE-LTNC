import {Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';
import { SelectedProductService } from '../../../../selected-product.service';

@Component({
  selector: 'ngx-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private serviceProduct: ProductData, private toastrService: NbToastrService,
    private itemServ: SelectedProductService  ) {          
  }
  
  products = [];
  productdetail;
  imageDetail;
  @Input() idProduct = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes["idProduct"] != undefined) {
      this.serviceProduct.getProduct(changes["idProduct"].currentValue).subscribe(res => {
        if (res["status"] == "SUCCESS") {
          this.toastrService.show('Lấy chi tiết sản phẩm thành công', 'Thành công', { status: 'success' });
          this.productdetail = { 
            sale: res["data"][0].sale,
            id_Category: res["data"][0].id_Category,
            describe: res["data"][0].describe,
            id_Brand: res["data"][0].id_Brand,
            id_Product: res["data"][0].id_Product,
            id_Season: res["data"][0].id_Season,
            image: res["data"][0].image,
            name_Product: res["data"][0].name_Product,
            price: res["data"][0].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
            pricevnd: res["data"][0].price,
            pricesale: (res["data"][0].price - res["data"][0].sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
            quantity: res["data"][0].quantity,
            warranty_Period: res["data"][0].warranty_Period,
          };
          console.log(this.productdetail);
        }
      }, error => this.toastrService.show('Lấy chi tiết sản phẩm không thành công', 'Lỗi', { status: 'danger' }))
      console.log(changes["idProduct"].currentValue)

      this.serviceProduct.getImageDetailProduct(changes["idProduct"].currentValue).subscribe(res => {
        this.imageDetail = res['data'][0];
      })
    }
  }

  ngOnInit(): void {
    this.serviceProduct.getListProductByPage(0, 10).subscribe(res => {
      res['data'].map(product => {
        this.products.push({
          sale: product.sale,
          id_Category: product.id_Category,
          describe: product.describe,
          id_Brand: product.id_Brand,
          id_Product: product.id_Product,
          id_Season: product.id_Season,
          image: product.image,
          name_Product: product.name_Product,
          price: product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          quantity: product.quantity,
          warranty_Period: product.warranty_Period,
        })
      })
    })
  }

  addToCart(product) {
    this.itemServ.add(product);
    this.toastrService.show('Sản phẩm đã được thêm vào giỏ hàng', 'Thành công', { status: 'success' })
  }

}
