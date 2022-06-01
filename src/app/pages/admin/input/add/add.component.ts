import { Component, OnDestroy } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';
import { InputData } from '../../../../@core/data/input';
import { UserData } from '../../../../@core/data/users';

@Component({
  selector: 'ngx-modal-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddInputComponent implements OnDestroy {
  
  constructor(protected ref: NbDialogRef<AddInputComponent>,
              private serviceProduct: ProductData,
              private serviceInput: InputData,
              private serviceUser: UserData,
              private toastrService: NbToastrService) {
                  this.getProducts();
                  this.getUser();
  }
  
  selectedItem = [];
  errMsg;
  products;
  user;
  cancel() {
    this.ref.close();
  }

  getUser() {
    this.serviceUser.getUser().subscribe(res => {
        this.user = res;
    })
  }

  getProducts() {
    this.serviceProduct.getListProduct().subscribe(res => {
        this.products = res['data'];
    })
  }
  submit() {
        if ($("#inputQuantity").val() == '' || this.selectedItem == []) {
        this.toastrService.show('Thông tin phiếu nhập còn trống', 'Lỗi', { status: 'danger' });
        return;
    }
    var products = [];
    var quantity = String($("#inputQuantity").val()).split(',')
    for (let i = 0; i < this.selectedItem.length; i++) {
        var temp = this.products.filter((product) => {
            return product.id_Product == this.selectedItem[i]
        })        
        products.push({
            "idProduct": this.selectedItem[i],
            "quantity": quantity[i],
            "price": temp[0].price * parseInt(quantity[i])
        })
    } 
    var total = 0;
    for (let i = 0; i < products.length; i++) {
        total = total + products[i].price;
    }
    var data = {
        "idAccount": this.user.userId,
        "total": total,
        "products": products
    }
    // output for parent if submit succeed
    this.serviceInput.addReceipt(data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Thêm phiếu nhập thành công', 'Thành công', { status: 'success' });
          this.ref.close(true);
        } else {
          this.toastrService.show('Thêm phiếu nhập không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.errMsg = error;
          this.toastrService.show('Thêm phiếu nhập không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
