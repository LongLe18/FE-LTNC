import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductData } from '../../../@core/data/product';



@Component({
  selector: 'ngx-insurrace',
  styleUrls: ['./insurrance.component.scss'],
  templateUrl: './insurrance.component.html',
})
export class InsurranceComponent implements OnDestroy, OnInit {

  private alive = true;

  constructor(private toastrService: NbToastrService, private serviceProduct: ProductData) {
      
  }
  
  warrantly2;

  warrantly = {
    "idSeri": 122,
    "statusSeri": 1,
    "nameProduct": "Máy đánh trứng mini tiện dụng",
    "WarrantyPeriod": 0,
    "purchaseDate": "1/5/2029",
  }

  submit() {
    if ($("#text_seri").val() == '') {
      this.toastrService.show('Bạn chưa nhập số seri sản phẩm', 'Cảnh báo', { status: 'warning' })
      return;
    }
    $("#btn-check").click();
    this.serviceProduct.getInsurranceProduct($("#text_seri").val()).subscribe(res => {
      let length = res['data'].length;
      this.warrantly2 = res['data'][length - 1]
      console.log(res['data'][length - 1])
    })
  }

  click(x, y)
  {
      var ev = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'screenX': x,
          'screenY': y
      });

      var el = document.elementFromPoint(x, y);
      console.log(el); //print element to console
      el.dispatchEvent(ev);
  }

  ok() {
    this.click(0, 0);
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
