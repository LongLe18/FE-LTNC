import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router'; 
import { CategoryData } from '../../../@core/data/category';
import { SelectedProductService } from '../../../selected-product.service';

@Component({
  selector: 'ngx-cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnDestroy, OnInit {

  private alive = true;

  constructor(private toastrService: NbToastrService, private router: Router, private serviceCategory: CategoryData,
    private itemServ: SelectedProductService) {
      
  }

  
  subCategory;
  items = [];

  ngOnInit() {
    this.serviceCategory.getListParentCategory().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
          this.subCategory = response['data'];
        })
      }
    });
    this.getItems();
  }

  getItems(){
    this.items = [];
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
          count: Count      
      })
    }
    console.log(this.items);
  }

  payment() {
    this.router.navigate(["/page-user/main"]);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  remove(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]['id_Product'] == id) {
        this.items.splice(i, 1);
      }
    }
  }

  up(product) {
    this.itemServ.add(product);
    this.getItems()
  }

  down(product) {
    this.itemServ.remove(product);
    this.getItems()
  }
}