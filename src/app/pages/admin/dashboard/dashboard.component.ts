import {Component, Input, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import {  NbToastrService } from '@nebular/theme';
import { InputData } from '../../../@core/data/input';
import { CategoryData } from '../../../@core/data/category';
import { ExportService } from '../../../@core/mock/export.service';

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
              private inputservice: InputData, private serviceCategory: CategoryData,
              private exportService: ExportService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
    this.getCates();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  sums = [];
  sums2 = [];
  from = '';
  to = '';
  total = 0;
  total2 = 0;
  listCates;
  selectedCate = 'DCNB';

  getCates() {
    this.serviceCategory.getListParentCategory().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
          this.listCates = response['data'];
        })
      }
    });
  }

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

  onChange(e) {
    this.inputservice.dashboard2(e).subscribe(res => {
      console.log(res['data']);
      this.sums2 = res['data'];
      this.sums2.map(sum => {
        this.total2 += sum.price;
      })
    })
  }

  export() {
    if (this.sums.length > 0) {
      this.exportService.exportExcel(this.sums, 'ThongKeDT');
    }
    else {
      this.toastrService.show('Bạn chưa chọn ngày tháng thống kê', 'Cảnh báo', { status: 'warning' });
    }
  }

  export2() {
    if (this.sums2.length > 0) {
      this.exportService.exportExcel(this.sums2, 'ThongKeDT');
    }
    else {
      this.toastrService.show('Bạn chưa chọn loại thống kê', 'Cảnh báo', { status: 'warning' });
    }
  }
}
