import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { InvoiceData } from '../../../@core/data/invoice';
import { DetailInvoiceComponent } from './detail/detail.component';
import { EditInvoiceComponent } from './edit/edit.component';
import { ExportService } from '../../../@core/mock/export.service';

@Component({
    selector: 'ngx-invoice',
    styleUrls: ['./invoice.component.scss'],
    templateUrl: './invoice.component.html',
  })
export class InvoiceComponent implements OnInit {
  constructor(private serviceInvoice: InvoiceData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog, private exportService: ExportService) {

  }

  invoices;
  length;


  openEditInvoice(id) {
    const dialogRef = this.dialog.open(EditInvoiceComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.serviceInvoice.getListInvoices2().subscribe(res => {
          this.invoices = res['data'];
        }, 
          error => this.toastrService.show('Lấy hóa đơn không thành công', 'Lỗi', { status: 'danger' })
        ) 
      }
    });
  }

  ngOnInit(): void {

    this.serviceInvoice.getListInvoices2().subscribe(res => {
      this.invoices = res['data'];
    }, 
      error => this.toastrService.show('Lấy hóa đơn không thành công', 'Lỗi', { status: 'danger' })
    ) 
  }

  openDetail(id) {
    const dialogRef = this.dialog.open(DetailInvoiceComponent, { data: { id: id } });
  }

  export() {
    this.exportService.exportExcel(this.invoices, 'ThongKeHoaDon');
  }
}
