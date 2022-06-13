import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../../@core/data/product';
import { CategoryData } from '../../../../@core/data/category';
import { BrandData } from '../../../../@core/data/brand';

@Component({
  selector: 'ngx-modal-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
})
export class SearchProductComponent implements OnDestroy, OnInit {
  
  constructor(protected ref: NbDialogRef<SearchProductComponent>,
              private serviceProduct: ProductData, private serviceCategory: CategoryData, private serviceBrand: BrandData,
              private toastrService: NbToastrService) {
  }
  
  selectedItem = '';
  seasons;
  brands;
  cates;
  errMsg;

  selectedCate = 0;
  selectedBrand = 0;
  selectSeason = 0;

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
    var data = {
        "describe": $("#inputDescribe").val(),
        "id_Category": this.selectedCate,
        "id_Brand": this.selectedBrand,
        "id_Season": this.selectSeason
    }
    this.ref.close(data);

    // output for parent if submit succeed
  }

  ngOnDestroy(): void {
    
  }
}
