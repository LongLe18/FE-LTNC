import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnDestroy, OnInit {

  private alive = true;

  user;

  constructor(private serviceUser: UserData, private router: Router, 
    private toastrService: NbToastrService) {
      
  }

  userId;
  password;
  userName;
  email;
  name;
  address;
  phone;
  auth;
  access;
  status;
  roles; 

  ngOnInit() {
    this.serviceUser.getUser().subscribe(res => {
      console.log(res);
      this.userId = res["userId"]
      this.password = res["password"];
      this.userName = res["userName"];
      this.email = res["email"];
      this.name = res["name"];
      this.address = res["address"];
      this.phone = res["phone"];

      this.auth = res['auth'];
      this.access = res['access'];
      this.status = res['status'];
      this.roles = res['roles'];
    })
  }

  submit(id) {
    var data = {    
      "userId": id,
      "userName": this.userName,
      "password": this.password,
      "auth": false,
      "email": this.email,
      "name": this.name,
      "address": this.address,
      "phone": this.phone,
      "access": 0,
      "status": 0,
      "roles": this.roles,
    }
    this.serviceUser.updateUser(id, data).subscribe(res => {
      if (res["status"] == "SUCCESS") {
        this.toastrService.show('Cập nhật thông tin thành công', 'Thành công', { status: 'success' })
        this.router.navigate(["/page-user/main"]);
      } else {
        error => this.toastrService.show('Cập nhật thông tin không thành công', 'Lỗi', { status: 'danger' })
      }
    }, error => this.toastrService.show('Cập nhật thông tin không thành công', 'Lỗi', { status: 'danger' }))
  }

  cancel() {
    this.router.navigate(["/page-user/main"]);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
