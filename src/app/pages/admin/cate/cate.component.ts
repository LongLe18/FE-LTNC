import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CategoryData } from '../../../@core/data/category';
import { AddCateComponent } from './addCate/add.component';
import { EditCateComponent } from './editCate/edit.component';
@Component({
    selector: 'ngx-cate',
    styleUrls: ['./cate.component.scss'],
    templateUrl: './cate.component.html',
  })
export class CateComponent implements OnInit {
  constructor(private serviceCategory: CategoryData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog) {

  }

  listCates;

  openAddCate() {
    this.dialogService.open(AddCateComponent)
      .onClose.subscribe(res => {
        if (res == true) {
          this.getCates();
        }
      });
  }

  openEditCate(id, name) {
    const dialogRef = this.dialog.open(EditCateComponent, { data: { id: id, name: name } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) this.getCates();
    });
  }

  ngOnInit(): void {
    this.getCates();
  }

  getCates() {
    this.serviceCategory.getListParentCategory().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
          this.listCates = response['data'];
        })
      }
    });
  }

  onDeleCate(id) {
    const ask = window.confirm('Bạn có chắc chắn muốn xóa danh mục này không ? ')
    if (ask) {
      this.serviceCategory.deleteCate(id).subscribe(res => {
        if (res.status == "SUCCESS") {
          this.toastrService.show('Xóa danh mục thành công', 'Thành công', { status: 'success' });
          this.getCates();
        }
      }, error => this.toastrService.show('Xóa danh mục không thành công ' + error, 'Lỗi', { status: 'danger' }))
    }
  }
}
