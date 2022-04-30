import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-insurrace',
  styleUrls: ['./insurrance.component.scss'],
  templateUrl: './insurrance.component.html',
})
export class InsurranceComponent implements OnDestroy, OnInit {

  private alive = true;

  constructor(private toastrService: NbToastrService) {
      
  }
  
  submit() {
    $("#btn-check").click();
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
