import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CategoryData } from '../../../../@core/data/category';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditCateComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string, name: string},
            public dialogRef: MatDialogRef<EditCateComponent>,
              private serviceCategory: CategoryData,
              private toastrService: NbToastrService) {
  }
  
  submit() {
    var data = {     
        "name_Category": $("#inputCateName").val(),
        "parent_Category": "GD"
    }
    // output for parent if submit succeed
    this.serviceCategory.editCate(data, this.data.id)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Sửa thông tin loại thành công', 'Thành công', { status: 'success' });
          this.dialogRef.close(true);
        } else {
          this.toastrService.show('Sửa thông tin loại không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.toastrService.show('Sửa thông tin loại không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
