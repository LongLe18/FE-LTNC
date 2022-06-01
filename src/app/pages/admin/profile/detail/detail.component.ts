import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UserData } from '../../../../@core/data/users';

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class TabsComponent implements OnInit {
  public constructor(
    private readonly themeService: NbThemeService, 
    private userService: UserData,
    private toastrService: NbToastrService) {
  }

  user: any;
  private destroy$: Subject<void> = new Subject<void>();
  public materialTheme$: Observable<boolean>;
  public starRate: number = 2;
  public heartRate: number = 4;
  public radioGroupValue: string = 'This is value 2';
  public showMaterialInputs = false;

  public readonly statuses: NbComponentStatus[] = [ 'primary', 'danger' ];
  selectedItem = '';
  private idUser = '';

  isChecked = true;

  ngOnInit() {
    this.materialTheme$ = this.themeService.onThemeChange()
    .pipe(tap(theme => {
      const themeName: string = theme?.name || '';
      this.showMaterialInputs = themeName.startsWith('material');
    }));

    this.getInfoUser();
  } 

  
  getInfoUser() {
    this.userService.getUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.user = data;
      this.idUser = this.user['userId'];
      this.isChecked = this.user['auth'];
    });
  }


  onEditUser(event) {
    if ($("#inputPass1").val() == '' || $("#inputPass2").val() == '') {
      this.toastrService.show('Bạn chưa nhập mật khẩu cũ/mới', 'Cảnh báo', { status: 'warning' });
      return;
    }
    var newData = {
      "userId": this.idUser,
      "userName": $("#inputUsername").val(),
      "password": $("#inputPass1").val(),
      "auth": false,
      "email": this.user['email'],
      "name": $("#inputFirstName").val(),
      "address": $("#inputAddress").val(),
      "phone": $("#inputPhone").val(),
      "access": this.user['acess'],
      "status": this.user['status'],
      "roles": this.user["roles"]
    };
    this.userService.updateUser(this.idUser, newData, $("#inputPass2").val()).subscribe((response: any) => {
      if (response["status"] == "SUCCESS") {
        this.getInfoUser();
        this.toastrService.show('Cập nhật thông tin thành công', 'Thành công', { status: 'success' });
      } else {
        this.toastrService.show('Cập nhật thông tin không thành công', 'Lỗi', { status: 'danger' });
      }
    })
  }

  test() {
    var check = '1';
    
    if ($("#inputPhone").val() == '') {
      this.toastrService.show('Bạn chưa có số điện thoại xác thực', 'Cảnh báo', { status: 'warning' });
      return;
    }
    if (this.isChecked == true) {
      check = '1';
    } else {
      check = '2'
    }
    this.userService.changeAuth(this.idUser, check).subscribe((response: any) => {
      if (response["status"] == "SUCCESS") {
        this.getInfoUser();
        this.toastrService.show('Bật/Tắt xác thực 2 lớp thành công', 'Thành công', { status: 'success' });
      } else {
        this.toastrService.show('Bật/Tắt xác thực 2 lớp không thành công', 'Lỗi', { status: 'danger' });
      }
    })
  }
}
