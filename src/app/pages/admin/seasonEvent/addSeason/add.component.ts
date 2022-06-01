import { Component, OnDestroy } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SeasonData } from '../../../../@core/data/season';

@Component({
  selector: 'ngx-modal-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddSeasonComponent implements OnDestroy {
  
  constructor(protected ref: NbDialogRef<AddSeasonComponent>,
              private serviceSeason: SeasonData,
              private toastrService: NbToastrService) {
                this.getSeasons();
  }
  
  selectedItem = '';
  errMsg;
  length
  cancel() {
    this.ref.close();
  }

  getSeasons() {
    this.serviceSeason.getListSeason().subscribe(res => {
        this.length = res['data'].length;
      }, 
        error => this.toastrService.show('Lấy sự kiện không thành công', 'Lỗi', { status: 'danger' })
      ) 
  }

  submit() {
    var data = {
        "id_Season": this.length + 1,
        "name_Season": $("#inputSeasonName").val(),
        "dateStart": $("#inputDateStart").val(),
        "dateEnd": $("#inputDateEnd").val()
    }
    // output for parent if submit succeed
    this.serviceSeason.addSeason(data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Thêm sự kiện thành công', 'Thành công', { status: 'success' });
          this.ref.close(true);
        } else {
          this.toastrService.show('Thêm sự kiện không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.errMsg = error;
          this.toastrService.show('Thêm sự kiện không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
