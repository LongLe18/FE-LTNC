import { ViewportScroller } from '@angular/common';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'ngx-footeruser',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterUserComponent implements OnInit {
  constructor(private scroll: ViewportScroller) {  }
  
  topFunction() {
    this.scroll.scrollToPosition([0,0]);
  }

  ngOnInit(): void {
        
  }
}
