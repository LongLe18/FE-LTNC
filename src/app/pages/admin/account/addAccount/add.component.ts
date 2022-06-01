import { Component, OnDestroy, Output } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UserData } from '../../../../@core/data/users';

@Component({
  selector: 'ngx-modal-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddUserComponent implements OnDestroy {
  
  constructor(protected ref: NbDialogRef<AddUserComponent>,
              private userData: UserData,
              private toastrService: NbToastrService) {
  }
  
  selectedItem = '';
  errMsg;

  cancel() {
    this.ref.close();
  }

  submit() {
    var data = {
      "username": $("#inputUserName").val(),
      "email": $("#inputEmail").val(),
      "password": $("#inputPassword").val()
    }
    // output for parent if submit succeed
    this.userData.addUser(data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Thêm người dùng thành công', 'Thành công', { status: 'success' });
          this.ref.close(true);
        } else {
          this.toastrService.show('Thêm người dùng không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.errMsg = error;
          this.toastrService.show('Thêm người dùng không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
