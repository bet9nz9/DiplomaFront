import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddressService} from '../../../controller/address.service';
import {Address} from '../../../model/address';
import {WaitComponent} from '../../wait/wait.component';
import {UserService} from '../../../controller/user.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {

  constructor(private http: AddressService,
              @Inject(MAT_DIALOG_DATA) public address: Address,
              private dialog: MatDialog,
              private userService: UserService) {
  }

  closeDialog = false;

  formGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  disable = false;
  users: User[] = [];
  userEmail = '';

  ngOnInit(): void {
    this.http.getById(this.address.id).subscribe(
      (response) => {
        this.address = response;
        this.userEmail = this.address.referencedUser == undefined ? '' : this.address.referencedUser.email;
      }, (error => console.log('error occupied: ' + error))
    );
    this.userService.getAll().subscribe(
      (response) => {
        // @ts-ignore
        this.users = response.content;
        this.disable = true;
      }
    );
  }

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  updateAddress(): void {
    let i = 0;
    for (i; i < this.users.length; i++) {
      if (this.users[i].email == this.userEmail) {
        this.address.referencedUser = this.users[i];
      }
    }
    this.openWaitDialog();
    this.http.updateAddress(this.address).subscribe((data) => {
      this.dialog.closeAll();
      location.reload();
    });
  }
}
