import { Component, Output, EventEmitter } from '@angular/core';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.scss'],
})
export class DatepickerComponent {

  @Output() start = new EventEmitter<string>();
  @Output() end = new EventEmitter<string>();
  @Output() str = new EventEmitter<string>();

  constructor(protected dateService: NbDateService<Date>) {
    
  }

  onEventStartEndRange(event) {
    if ( (event['start'] && event['end']) != null) {
      this.start.emit(event['start'].toISOString());
      this.end.emit(event['end'].toISOString());
    }
  }
}
