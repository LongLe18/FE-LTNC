import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { InputData } from '../../../@core/data/input';
import { DetailInputComponent } from './detail/detail.component';
// import { EditInvoiceComponent } from './edit/edit.component';
import { AddInputComponent } from './add/add.component';

@Component({
    selector: 'ngx-input',
    styleUrls: ['./input.component.scss'],
    templateUrl: './input.component.html',
  })
export class InputComponent implements OnInit {
  constructor(private serviceInput: InputData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog) {

  }

  inputs;
  length;


  openAddInput() {
    this.dialogService.open(AddInputComponent)
      .onClose.subscribe(res => {
        if (res == true) {
          this.getInputs();
        }
      });
  }

  openEditInput(id) {
    // const dialogRef = this.dialog.open(EditInvoiceComponent, { data: { id: id } });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == true) {
    //     this.serviceInvoice.getListInvoices2().subscribe(res => {
    //       this.invoices = res['data'];
    //     }, 
    //       error => this.toastrService.show('Lấy hóa đơn không thành công', 'Lỗi', { status: 'danger' })
    //     ) 
    //   }
    // });
  }

  ngOnInit(): void {
    this.getInputs();
  }

  getInputs() {
    this.serviceInput.getListReceipts().subscribe(res => {
      this.inputs = res['data'];
    }, 
      error => this.toastrService.show('Lấy phiếu nhập không thành công', 'Lỗi', { status: 'danger' })
    ) 
  }

  openDetailInput(id) {
    const dialogRef = this.dialog.open(DetailInputComponent, { data: { id: id } });
  }

  onDeleteInput(id) {

  }
}
