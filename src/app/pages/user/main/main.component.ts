import {Component, OnDestroy, OnInit} from '@angular/core';
import { CategoryData } from '../../../@core/data/category';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-main',
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnDestroy, OnInit {

  private alive = true;
  subCategory;
  private routeSub: Subscription;
  
  idCate;

  constructor(private serviceCategory: CategoryData, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.serviceCategory.getListParentCategory().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
          this.subCategory = response['data'];
        })
      }
    });

    this.routeSub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
          this.idCate = params['id']
      }
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
