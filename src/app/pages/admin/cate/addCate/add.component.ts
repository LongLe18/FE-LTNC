import { Component, OnDestroy } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CategoryData } from '../../../../@core/data/category';

@Component({
  selector: 'ngx-modal-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddCateComponent implements OnDestroy {
  
  constructor(protected ref: NbDialogRef<AddCateComponent>,
              private serviceCategory: CategoryData,
              private toastrService: NbToastrService) {
  }
  
  selectedItem = '';
  errMsg;

  cancel() {
    this.ref.close();
  }

  submit() {
    var data = {
      "id_Category": $("#inputCode").val(),
      "name_Category": $("#inputCateName").val(),
      "parent_Category": 'GD'
    }
    // output for parent if submit succeed
    this.serviceCategory.addCate(data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Thêm danh mục thành công', 'Thành công', { status: 'success' });
          this.ref.close(true);
        } else {
          this.toastrService.show('Thêm danh mục không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.errMsg = error;
          this.toastrService.show('Thêm danh mục không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
