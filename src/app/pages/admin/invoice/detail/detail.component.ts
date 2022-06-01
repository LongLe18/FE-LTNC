import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { InvoiceData } from '../../../../@core/data/invoice';
import { ProductData } from '../../../../@core/data/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-detail',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class DetailInvoiceComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<DetailInvoiceComponent>,
              private serviceInvoice: InvoiceData, private serviceProduct: ProductData,
              private toastrService: NbToastrService) {
                this.getInvoice();
  }
  
  selected;

  details = [];

  getInvoice() {
    this.serviceInvoice.getDetailInvoice(this.data.id).subscribe(res => {
        res['data'].map(item => {
            this.serviceProduct.getProduct(item.idProduct).subscribe(res2 => {
                this.details.push({...item, 'nameProduct': res2['data'][0].name_Product})
            })
        })
    })
    console.log(this.details);
  }
  

  ngOnDestroy(): void {
    
  }
}
