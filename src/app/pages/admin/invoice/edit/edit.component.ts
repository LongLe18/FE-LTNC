import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { InvoiceData } from '../../../../@core/data/invoice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditInvoiceComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<EditInvoiceComponent>,
              private serviceInvoice: InvoiceData,
              private toastrService: NbToastrService) {
                this.getInvoice();
  }
  
  selected;
  
  getInvoice() {
    this.serviceInvoice.getInvoiceById(res => {
      this.selected = res.data['statusOrder']
    })
  }
  submit() {
    var data = {     
        "statusOrder": this.selected
    }
    // output for parent if submit succeed
    this.serviceInvoice.changeStatusInvoice(this.data.id, data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Cập nhật hóa đơn thành công', 'Thành công', { status: 'success' });
          this.dialogRef.close(true);
        } else {
          this.toastrService.show('Cập nhật hóa đơn không thành công', 'Lỗi', { status: 'danger' });
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
