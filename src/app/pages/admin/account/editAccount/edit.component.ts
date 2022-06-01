import { Component, OnDestroy, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserData } from '../../../../@core/data/users';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-modal-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditUserComponent implements OnDestroy {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: {id: string},
            public dialogRef: MatDialogRef<EditUserComponent>,
              private userData: UserData,
              private toastrService: NbToastrService) {
    this.getUser();
  }
  
  selectedItem = '';
  user;

  getUser() {
    this.userData.getUserById(this.data.id).subscribe(res => {
        if (res['status'] == 'SUCCESS') {
            this.user = res['data'];
            this.selectedItem = res['data']['acess'].toString();
        }
        console.log(res);
    }, error => {
        this.toastrService.show('Lấy thông tin người dùng không thành công: ' + error, 'Lỗi', { status: 'danger' })
    })
  }
  
  submit() {
    var data = {     
        "userId": this.user['userId'],
        "userName": $("#inputUserName").val(),
        "auth": this.user['auth'],
        "email": $("#inputEmail").val(),
        "name": $("#inputName").val(),
        "address": $("#inputAddress").val(),
        "phone": $("#inputPhone").val(),
        "acess": parseInt(this.selectedItem, 0),
        "status": 1,
        "roles": (this.selectedItem == '1') ? [{"id": 1, "name": "ROLE_ADMIN"}] : [{"id": 1, "name": "ROLE_USER"}]
    }
    // output for parent if submit succeed
    this.userData.updateUserById(data)
      .subscribe(response => {
        if (response['status'] == 'SUCCESS') {
          this.toastrService.show('Sửa thông tin người dùng thành công', 'Thành công', { status: 'success' });
          this.dialogRef.close(true);
        } else {
          this.toastrService.show('Sửa thông tin gười dùng không thành công', 'Lỗi', { status: 'danger' });
        }
      },
        error => {
          this.toastrService.show('Sửa thông tin người dùng không thành công: ' + error, 'Lỗi', { status: 'danger' })
        }
      )   
  }

  ngOnDestroy(): void {
    
  }
}
