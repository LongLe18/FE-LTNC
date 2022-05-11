import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { faFacebook, faYoutube, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-detailproduct',
  styleUrls: ['./detailproduct.component.scss'],
  templateUrl: './detailproduct.component.html',
})
export class DetailProductComponent implements OnDestroy, OnInit {

  private alive = true;

  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faGoogle = faGoogle;
  private routeSub: Subscription;
  idProduct;

  constructor(private toastrService: NbToastrService, private router: Router, private route: ActivatedRoute) {
      
  }

  submit() {
    this.toastrService.show('Gửi liên lạc thành công\n Chúng tôi sẽ liên lạc bạn trong thời gian sớm nhất', 'Thành công', { status: 'success' })
    this.router.navigate(["/page-user/main"]);
  }
  
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id'] != null) {
          this.idProduct = params['id'];      
      }
    }); 
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
