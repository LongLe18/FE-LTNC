import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';
import { SelectedProductService } from '../../../../selected-product.service';
import { SearchProductComponent } from '../search/search.component';

interface Product {
    describe: String
    id_Brand: String
    id_Category: String
    id_Product: String
    id_Season: Number
    image: String
    name_Product: String
    price: Number
    quantity: Number
    sale: Number
    warranty_Period: Number
}

@Component({
  selector: 'ngx-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnChanges {
  constructor(private serviceProduct: ProductData, private toastrService: NbToastrService, private itemServ: SelectedProductService,
    private dialogService: NbDialogService) {  }
  

  length;
  pageIndex = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 30];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() idCate = '';
  @Input() idBrand = '';

  products = [];

  productsByCate = [];
  productsByBrand = [];
  saleProducts = [];
  salefastlyProducts = [];

  searchProducts = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes["idCate"] != undefined) {
      this.serviceProduct.getListProductByCategory(changes["idCate"].currentValue, 0, 10).subscribe(res => {
        if (res["status"] == "SUCCESS") {
          // this.toastrService.show('Lấy sản phẩm thành công', 'Thành công', { status: 'success' });
          res['data'].map(product => {
            this.productsByCate.push({
              sale: product.sale,
              id_Category: product.id_Category,
              describe: product.describe,
              id_Brand: product.id_Brand,
              id_Product: product.id_Product,
              id_Season: product.id_Season,
              image: product.image,
              name_Product: product.name_Product,
              price: product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
              pricevnd: product.price,
              pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
              quantity: product.quantity,
              warranty_Period: product.warranty_Period,
            })
          })
        }
      }, error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' }))
    }
    if (changes["idBrand"] != undefined) {
      this.serviceProduct.getListProductByBrand(changes["idBrand"].currentValue, 0, 10).subscribe(res => {
        if (res["status"] == "SUCCESS") {
          // this.toastrService.show('Lấy sản phẩm thành công', 'Thành công', { status: 'success' });
          res['data'].map(product => {
            this.productsByBrand.push({
              sale: product.sale,
              id_Category: product.id_Category,
              describe: product.describe,
              id_Brand: product.id_Brand,
              id_Product: product.id_Product,
              id_Season: product.id_Season,
              image: product.image,
              name_Product: product.name_Product,
              price: product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
              pricevnd: product.price,
              pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
              quantity: product.quantity,
              warranty_Period: product.warranty_Period,
            })
          })
        }
      }, error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' }))
    }

  }
  
  search() {
    this.dialogService.open(SearchProductComponent)
      .onClose.subscribe(res => {
        this.serviceProduct.search(res['id_Brand'], res['id_Category'], res['id_Season'], res['describe']).subscribe(res => {
          res['data'].map(product => {
            this.searchProducts.push({
              sale: product.sale,
              id_Category: product.id_Category,
              describe: product.describe,
              id_Brand: product.id_Brand,
              id_Product: product.id_Product,
              id_Season: product.id_Season,
              image: product.image,
              name_Product: product.name_Product,
              price: product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
              pricevnd: product.price,
              pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
              quantity: product.quantity,
              warranty_Period: product.warranty_Period,
            })
          })
        })
      }, error => this.toastrService.show('Tìm kiếm sản phẩm không thành công', 'Lỗi', { status: 'danger' }));
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
          pricevnd: product.price,
          pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          quantity: product.quantity,
          warranty_Period: product.warranty_Period,
        })
      })
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    ) 

    this.serviceProduct.getListSaleProducts().subscribe(res => {
      res['data'].map(product => {
        this.saleProducts.push({
          sale: product.sale,
          id_Category: product.id_Category,
          describe: product.describe,
          id_Brand: product.id_Brand,
          id_Product: product.id_Product,
          id_Season: product.id_Season,
          image: product.image,
          name_Product: product.name_Product,
          price: product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          pricevnd: product.price,
          pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          quantity: product.quantity,
          warranty_Period: product.warranty_Period,
        })
      })
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    )

    this.serviceProduct.getListProductFastly().subscribe(res => {
      res['data'].map(product => {
        this.salefastlyProducts.push({
          image: product.image,
          salednumber: product.numberSaled,
          sale: product.sale,
          id_Product: product.id_Product,
          name_Product: product.name_Product,
          price: product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          pricevnd: product.price,
          pricesale: (product.price - product.sale).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
          quantity: product.quantity,
        })
      })
    }, 
      error => this.toastrService.show('Lấy sản phẩm không thành công', 'Lỗi', { status: 'danger' })
    )
  }

  addToCart(product) {
    this.itemServ.add(product);
    this.toastrService.show('Sản phẩm đã được thêm vào giỏ hàng', 'Thành công', { status: 'success' })
  }
}
