import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SeasonData } from '../../../@core/data/season';
import { AddSeasonComponent } from './addSeason/add.component';
import { EditSeasonComponent } from './editSeason/edit.component';

@Component({
    selector: 'ngx-event',
    styleUrls: ['./event.component.scss'],
    templateUrl: './event.component.html',
  })
export class EventComponent {
  constructor(private serviceSeason: SeasonData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog) {
        this.getSeasons();
  }

  seasons;
  length;

  pageIndex = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 30];

  openAddEvent() {
    this.dialogService.open(AddSeasonComponent)
      .onClose.subscribe(res => {
        if (res == true) {
          this.getSeasons();
        }
      });
  }

  openEditEvent(id) {
    const dialogRef = this.dialog.open(EditSeasonComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getSeasons();
      }
    });
  }

  getSeasons() {
    this.serviceSeason.getListSeason().subscribe(res => {
        this.seasons = res['data'];
      }, 
        error => this.toastrService.show('Lấy sự kiện không thành công', 'Lỗi', { status: 'danger' })
      ) 
  }

  onDeleCate(id) {
    const ask = window.confirm('Bạn có chắc chắn muốn xóa sự kiện này không ? ')
    if (ask) {
      this.serviceSeason.deleteSeason(id).subscribe(res => {
        if (res.status == "SUCCESS") {
          this.toastrService.show('Xóa sự kiện thành công', 'Thành công', { status: 'success' });
          this.getSeasons();
        }
      }, error => this.toastrService.show('Xóa sự kiện không thành công ' + error, 'Lỗi', { status: 'danger' }))
    }
  }
}
