import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { InputData } from '../../../../@core/data/input';
import { ProductData } from '../../../../@core/data/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-detail',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class DetailInputComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<DetailInputComponent>,
              private serviceInput: InputData, private serviceProduct: ProductData,
              private toastrService: NbToastrService) {
                this.getDeatilInput();
  }
  
  selected;

  details;

  getDeatilInput() {
    this.serviceInput.getReceiptDetailById(this.data.id).subscribe(res => {
        this.details = res['data'];
        console.log(this.details);
    })
  }
  

  ngOnDestroy(): void {
    
  }
}
