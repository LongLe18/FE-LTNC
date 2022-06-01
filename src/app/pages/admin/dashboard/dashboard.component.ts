import {Component, Input, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import {  NbToastrService } from '@nebular/theme';
import { InputData } from '../../../@core/data/input';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  private alive = true;
  
  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
    'material-dark': CardSettings[];
    'material-light': CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
    'material-dark': this.commonStatusCardsSet,
    'material-light': this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService, private toastrService: NbToastrService,
              private inputservice: InputData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

  sums;
  from = '';
  to = '';
  total = 0;
  dashboard() {
    if ($("#datepickerFrom").val() == '' || $("#datepickerTo").val() == '') {
      this.toastrService.show('Bạn chưa chọn ngày tháng thống kê', 'Cảnh báo', { status: 'warning' });
      return;
    }
    var data = {
      "from": $("#datepickerFrom").val(), 
      "to": $("#datepickerTo").val()
    }
    this.from = String($("#datepickerFrom").val());
    this.to = String($("#datepickerTo").val());
    this.inputservice.dashboard(data).subscribe(res => {
      this.sums = res['data'];
      this.sums.map(sum => {
        this.total += sum.price;
      })
    })
  }
}
