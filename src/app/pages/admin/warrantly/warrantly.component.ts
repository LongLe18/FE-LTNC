import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { WarrantlyData } from '../../../@core/data/warrantly';
import { EditWarrantyComponent } from './editWarranty/edit.component';
@Component({
    selector: 'ngx-warrantly',
    styleUrls: ['./warrantly.component.scss'],
    templateUrl: './warrantly.component.html',
  })
export class WaranrlyComponent implements OnInit {
  constructor(private warrantyService: WarrantlyData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog) {

  }

  listWarranty;

  openEditWarranty(id) {
    const dialogRef = this.dialog.open(EditWarrantyComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) this.getWarrantly();
    });
  }

  ngOnInit(): void {
    this.getWarrantly();
  }

  getWarrantly() {
    this.warrantyService.getListWarrantly()
    .subscribe((data: any) => {
      if (data['status'] == 'SUCCESS') {
        this.listWarranty = data['data'];
      }
    });
  }
}
