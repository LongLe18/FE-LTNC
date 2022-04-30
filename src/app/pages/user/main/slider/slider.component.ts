import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'ngx-slider',
  styleUrls: ['./slider.component.scss'],
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnDestroy {

  private alive = true;
  

  constructor() {  }

  ngOnDestroy() {
    this.alive = false;
  }
}
