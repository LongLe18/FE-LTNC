import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { SeasonData } from '../../../../@core/data/season';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditSeasonComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<EditSeasonComponent>,
              private serviceSeason: SeasonData,
              private toastrService: NbToastrService) {
                this.getSeason();
  }
  
  season;

  getSeason() {
    this.serviceSeason.getSeasonById(this.data.id).subscribe(res => {
        this.season = res['data'];
      }, 
        error => this.toastrService.show('Lấy sự kiện không thành công', 'Lỗi', { status: 'danger' })
      ) 
  }
  submit() {
    var data = {
      "name_Season": $("#inputSeasonName").val(),
      "dateStart": $("#inputDateStart").val(),
      "dateEnd": $("#inputDateEnd").val()
  }
    // output for parent if submit succeed
    this.serviceSeason.editSeason(data, this.data.id)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Sửa thông tin sự kiện thành công', 'Thành công', { status: 'success' });
          this.dialogRef.close(true);
        } else {
          this.toastrService.show('Sửa thông tin sự kiện không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.toastrService.show('Sửa thông tin sự kiện không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
