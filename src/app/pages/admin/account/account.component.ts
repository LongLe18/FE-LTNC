import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AddUserComponent } from './addAccount/add.component';
import { EditUserComponent } from './editAccount/edit.component';
@Component({
    selector: 'ngx-account',
    styleUrls: ['./account.component.scss'],
    templateUrl: './account.component.html',
  })
export class AccountComponent implements OnInit {
  constructor(private usersService: UserData, private toastrService: NbToastrService,
    private dialogService: NbDialogService, private dialog: MatDialog) {

  }

  listUsers;

  openAddUser() {
    this.dialogService.open(AddUserComponent)
      .onClose.subscribe(res => {
        if (res == true) {
          this.getUsers();
        }
      });
  }

  openEditUser(id) {
    const dialogRef = this.dialog.open(EditUserComponent, { data: { id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) this.getUsers();
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
    .subscribe((data: any) => {
      if (data['status'] == 'SUCCESS') {
        this.listUsers = data['data'];
      }
    });
  }
}
