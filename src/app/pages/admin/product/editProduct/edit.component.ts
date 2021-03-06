import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';
import { CategoryData } from '../../../../@core/data/category';
import { BrandData } from '../../../../@core/data/brand';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditProductComponent implements OnDestroy, OnInit {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<EditProductComponent>,
              private serviceProduct: ProductData, private serviceCategory: CategoryData, private serviceBrand: BrandData,
              private toastrService: NbToastrService) {
  }
  
  selectedCate;
  selectedBrand;
  selectSeason;
  seasons;
  brands;
  cates;
  user;
  errMsg;
  product;
  file;

  ngOnInit(): void {
    this.serviceProduct.getSeason().subscribe(res => {
        this.seasons = res['data'];
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

    this.serviceProduct.getProduct(this.data.id).subscribe(res => {
        this.product = res['data'][0];
        this.selectSeason = this.product['id_Season'];
        this.selectedBrand = this.product['id_Brand'];
        this.selectedCate = this.product['id_Category'];
    })
  }
  
  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    if ($("#inputProductName").val() == '' || $("#inputImage").val() == '' || $("#inputQuantity").val() == '' ||
        $("#inputPrice").val() == '' || $("#inputDes").val() == '' || $("#inputSale").val() == '' || $("#inputWarrantly").val() == '' ||
        this.selectedCate == undefined || this.selectedBrand == undefined || this.selectSeason == undefined) {
            this.errMsg = 'Ch??a ????? th??ng tin s???n ph???m';
            return;
    }
    var data = {
        "name_Product": $("#inputProductName").val(),
        "image": "assets/images/sanpham/" +  this.file.name,
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
    this.serviceProduct.editProduct(data, this.data.id)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('S???a th??ng tin s???n ph???m th??nh c??ng', 'Th??nh c??ng', { status: 'success' });
          this.dialogRef.close(true);
        } else {
          this.toastrService.show('S???a th??ng tin s???n ph???m kh??ng th??nh c??ng', 'L???i', { status: 'danger' });
        }
      },
        error => {
          this.errMsg = error;
          this.toastrService.show('S???a th??ng tin s???n ph???m kh??ng th??nh c??ng: ' + error, 'L???i', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
