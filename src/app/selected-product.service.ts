import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SelectedProductService {

  private _items: { describe: String
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
  }[] = [];

  constructor() {

    this._items = JSON.parse(localStorage.getItem('items') ||'[]'); // get the data at lunch 
  }

  remove(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id_Product == item['id_Product']) {
        this._items.splice(i,1);
        break;
      }
    }
    this.syncItems();
  }

  removeAll(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id_Product == id) {
        this._items.splice(i,1);
        i--;
      }
    }
    this.syncItems();
  }

  add(item) { 
     this._items.push(item);
     this.syncItems();
  }

  get length() : number{
    return this._items.length
  }

  get items(){
    return this._items.slice(0)
  }

  getItems() {
    return this._items.slice(0)
  }

  check(id) {
    let bool = false;
    let items = this._items.slice(0);
    for (var i = 0; i < items.length; i++) {
      if (items[i].id_Product == id) {
        bool = true;
        break;
      }
    }
    return bool;
  }

  syncItems(){
    localStorage.setItem('items',JSON.stringify(this._items)); // sync the data

  }
}