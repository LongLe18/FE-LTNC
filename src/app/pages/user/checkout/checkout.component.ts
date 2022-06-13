import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CategoryData } from '../../../@core/data/category';
import { ProductData } from '../../../@core/data/product';
import { UserData } from '../../../@core/data/users';
import { SelectedProductService } from '../../../selected-product.service';

@Component({
  selector: 'ngx-checkout',
  styleUrls: ['./checkout.component.scss'],
  templateUrl: './checkout.component.html',
})
export class CheckOutComponent implements OnDestroy, OnInit {

  private alive = true;

  constructor(private toastrService: NbToastrService, private serviceCategory: CategoryData, private router: Router,
    private itemServ: SelectedProductService, private serviceUser: UserData, private serviceProduct: ProductData) {
      
  }

  subCategory;
  items = [];
  itemsCheckout = [];
  user;

  currentDate = new Date();
  DateDelivery;
  method = 'Thanh toán khi giao hàng';
  totalPrice = 0;
  totalPricevnd = '';

  ngOnInit() {
    this.serviceCategory.getListParentCategory().subscribe(res => {
        if (res.status == "SUCCESS") {
          this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
            this.subCategory = response['data'];
          })
        }
    });
    this.getItems();

    this.serviceUser.getUser().subscribe(res => {
        this.user = res;
    });
    this.DateDelivery = new Date(this.currentDate.getTime() + 1000 * 60 * 60 * 24 * 3).toLocaleDateString();
  }
  
  getItems(){
    this.items = [];
    this.totalPrice = 0;
    let Count = 1;
    const listItems = this.itemServ.getItems();
    for (let i = 0; i < listItems.length; i++) {
      Count = 1;
      for (let j = i + 1; j < listItems.length; j++) {
        if (listItems[i]['id_Product'] == listItems[j]['id_Product']) {
          Count = Count + 1;
          listItems.splice(j, 1);
          j--;
        }
      }
      this.items.push({
          describe: listItems[i]['describe'],
          id_Brand: listItems[i]['id_Brand'],
          id_Category: listItems[i]['id_Category'],
          id_Product: listItems[i]['id_Product'],
          id_Season: listItems[i]['id_Season'],
          image: listItems[i]['image'],
          name_Product: listItems[i]['name_Product'],
          price: listItems[i]['price'],
          quantity: listItems[i]['quantity'],
          sale: listItems[i]['sale'],
          warranty_Period: listItems[i]['warranty_Period'],
          count: Count,
          total: ((listItems[i]['pricevnd'] - listItems[i].sale) * Count).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
      })
      this.itemsCheckout.push({
        idProduct: listItems[i]['id_Product'],
        price: listItems[i]['price'],
        quantity: Count,      
        sale: listItems[i]['sale'],
    })
      this.totalPrice = this.totalPrice + (Number(listItems[i]['pricevnd']) - Number(listItems[i]['sale'])) * Count
      this.totalPricevnd = (this.totalPrice + (Number(listItems[i]['pricevnd']) - Number(listItems[i]['sale'])) * Count).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
    console.log(this.items);
  }

  remove(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]['id_Product'] == id) {
        this.items.splice(i, 1);
      }
    }
    this.itemServ.removeAll(id)
    this.getItems();
  }

  up(product) {
    this.itemServ.add(product);
    this.getItems()
  }

  down(product) {
    this.itemServ.remove(product);
    this.getItems()
  }

  ngOnDestroy() {
    this.alive = false;
  }

  submit() {
    var data = {
      "idAccount": this.user['userId'],
      "address": $("#address").val(),
      "method": this.method,
      "total": this.totalPrice,
      "idShipper": 1,
      "products": this.itemsCheckout
    }
    this.serviceProduct.checkout(data).subscribe(res => {
      if (res["status"] == "SUCCESS") {
        this.toastrService.show('Đặt hàng thành công', 'Thành công', { status: 'success' });
        localStorage.removeItem('items');
        this.router.navigate(["/page-user/main"]);
      }
    }, error => this.toastrService.show(`Đặt hàng không thành công: ${error}`, 'Lỗi', { status: 'error' }))
  }

  change(e) {
      this.method = e.target.value;
      console.log(this.method);
  }
}