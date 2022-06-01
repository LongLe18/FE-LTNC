import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { WarrantlyData } from '../../../../@core/data/warrantly';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditWarrantyComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<EditWarrantyComponent>,
              private serviceWarranty: WarrantlyData,
              private toastrService: NbToastrService) {
  }
  
  warranty;
  selectedStatus;

  getWarranty() {
    this.serviceWarranty.getWarrantlyById(this.data.id).subscribe(res => {
        this.warranty = res['data'];
        this.selectedStatus = this.warranty['status'];
      }, 
        error => this.toastrService.show('Lấy sự kiện không thành công', 'Lỗi', { status: 'danger' })
      ) 
  }

  submit() {
    var data = {     
        "returnDate": $("#inputDate").val(),
        "status": this.selectedStatus
    }
    // output for parent if submit succeed
    this.serviceWarranty.updateWarranty(data, this.data.id)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Sửa bảo hành loại thành công', 'Thành công', { status: 'success' });
          this.dialogRef.close(true);
        } else {
          this.toastrService.show('Sửa bảo hành loại không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.toastrService.show('Sửa bảo hành loại không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
