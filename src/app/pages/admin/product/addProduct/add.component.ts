import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';
import { CategoryData } from '../../../../@core/data/category';
import { BrandData } from '../../../../@core/data/brand';

@Component({
  selector: 'ngx-modal-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddProductComponent implements OnDestroy, OnInit {
  
  constructor(protected ref: NbDialogRef<AddProductComponent>,
              private serviceProduct: ProductData, private serviceCategory: CategoryData, private serviceBrand: BrandData,
              private toastrService: NbToastrService) {
  }
  
  selectedItem = '';
  seasons;
  brands;
  cates;
  errMsg;

  selectedCate;
  selectedBrand;
  selectSeason;

  ngOnInit(): void {
    this.serviceProduct.getSeason().subscribe(res => {
        this.seasons = res['data']
    })

    this.serviceBrand.getBrand().subscribe(res => {
        this.brands = res['data'];
    })

    this.serviceCategory.getListParentCategory().subscribe(res => {
        if (res.status == "SUCCESS") {
          this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
            this.cates = response['data'];
          })
        }
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if ($("#inputProductName").val() == '' || $("#inputImage").val() == '' || $("#inputQuantity").val() == '' ||
        $("#inputPrice").val() == '' || $("#inputDes").val() == '' || $("#inputSale").val() == '' || $("#inputWarrantly").val() == '' ||
        this.selectedCate == undefined || this.selectedBrand == undefined || this.selectSeason == undefined) {
            this.errMsg = 'Chưa đủ thông tin sản phẩm';
            return;
    }
    var data = {
        "name_Product": $("#inputProductName").val(),
        "image": $("#inputImage").val(),
        "quantity": $("#inputQuantity").val(),
        "describe": $("#inputDes").val(),
        "price": $("#inputPrice").val(),
        "sale": $("#inputSale").val(),
        "warranty_Period": $("#inputWarrantly").val(),
        "id_Category": this.selectedCate,
        "id_Brand": this.selectedBrand,
        "id_Season": this.selectSeason
    }
    // output for parent if submit succeed
    this.serviceProduct.addProduct(data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Thêm sản phẩm thành công', 'Thành công', { status: 'success' });
          this.ref.close(true);
        } else {
          this.toastrService.show('Thêm sản phẩm không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.errMsg = error;
          this.toastrService.show('Thêm sản phẩm không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
