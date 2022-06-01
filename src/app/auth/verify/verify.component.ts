import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../@core/data/users';

@Component({
  selector: 'ngx-verify',
  templateUrl: './verify.component.html',
})
export class NgxVerifyComponent {
    ////// ADMIN / MONITOR bắt buộc xác thực OTP; USER có hoặc không
    role;
    code;
    phone;
    username;
    password;
    messageSuccess;
    messageError;
    constructor(private service: UserData, private router: Router) {
        this.service.getUser().subscribe(res => {
            console.log(res);
            if ( res['roles'].length == 0 || (res['auth'] == false && res['roles'][0].name == 'ROLE_USER') ) {
                this.router.navigate(['/page-user/main']);
            } else if ((res['auth'] == false && res['roles'][0].name != 'ROLE_USER')) {
                this.router.navigate(['/pages-admin/account-manager']);
            }
            else {
                this.role = res['roles'][0].name;
                this.phone = res['phone'];
                this.username = res['userName'];
            }
        });
    }

    getOTP() {
        this.service.getOTP(this.phone, this.username, this.password).subscribe(res =>  {
            console.log(res);
        }, error => {this.messageError = 'Mật khẩu không được để trống hoặc sai mật khẩu'});
    }

    changeCode(e) {
        this.code = e.target.value;
    }

    submit() {
        this.service.verifyOTP(this.code).subscribe(res => {
            if (res.statusCode == "ACCEPTED") {
                if (this.role == 'ROLE_USER') {
                    this.router.navigate(['/page-user/main']); // => redirect user's page
                }
                else {
                    this.router.navigate(['/pages-admin/dashboard']);                    // => redirect admin's page
                } 
                this.messageSuccess = res.message;
            }
        }, error => {this.messageError = error});
    }
}