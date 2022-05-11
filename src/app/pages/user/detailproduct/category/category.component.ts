import {Component, OnInit} from '@angular/core';
import { BrandData } from '../../../../@core/data/brand';
import { CategoryData } from '../../../../@core/data/category';

@Component({
  selector: 'ngx-category',
  styleUrls: ['./category.component.scss'],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  constructor(private serviceCategory: CategoryData, private serviceBrand: BrandData) {  }
  
    subCategory;
    subBrand;
    ads;

    ngOnInit(): void {
        ////////// get Parent Category
        this.serviceCategory.getListParentCategory().subscribe(res => {
            if (res.status == "SUCCESS") {
            this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
                this.subCategory = response['data'];
            })
            }
        })

        this.serviceBrand.getListParentBrand().subscribe(res => {
            if (res.status == "SUCCESS") {
                this.serviceBrand.getListSubBrand(res['data'][0]['idBrand']).subscribe(response => {
                    this.subBrand = response['data'];
                })
            }
        })

        this.serviceBrand.getAds().subscribe(res => {
            if (res.status == "SUCCESS") {
                this.ads = res['data']
            }
        })
    }
}
