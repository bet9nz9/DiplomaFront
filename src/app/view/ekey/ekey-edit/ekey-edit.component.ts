import {Component, Inject, OnInit} from '@angular/core';
import {EKeyService} from '../../../controller/eKey.service';
import {UserService} from '../../../controller/user.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {User} from '../../../model/user';
import {Ekey} from '../../../model/ekey';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WaitComponent} from '../../wait/wait.component';

@Component({
  selector: 'app-ekey-edit',
  templateUrl: './ekey-edit.component.html',
  styleUrls: ['./ekey-edit.component.scss']
})
export class EkeyEditComponent implements OnInit {

  constructor(private eKeyService: EKeyService,
              private userService: UserService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public eKey: Ekey,) { }

  users: User[] = [];
  flexWheel = false;
  userName: string;
  isActive: string;

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    keyCodeForm: new FormControl('', Validators.required),
    activeForm: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.eKeyService.getOne(this.eKey.id).subscribe(
      (response) => {
        this.eKey = response;
        this.userName = this.eKey.referencedUser == null ? 'Не назначен' :  this.eKey.referencedUser.name;
        this.isActive = String(this.eKey.isActive);
        this.userService.getAll().subscribe(
          (response) =>
          {
            // @ts-ignore
            this.users = response.content;
            this.flexWheel = true;
          }, (error => console.log('error occupied: '+ error))
        );
      }, (error => console.log('error occupied: '+ error)));
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  editEKey(): void {
    this.openWaitDialog();
    let i;
    if(this.userName != '') {
      for(i = 0; i < this.users.length; i++) {
        if (this.userName === this.users[i].name){
          this.eKey.referencedUser = this.users[i];
          break;
        }
      }
    }
    this.eKey.isActive = this.isActive === "true";
    this.eKeyService.updateKey(this.eKey).subscribe((data) =>
      {
        this.dialog.closeAll();
      }, (error) =>
      {
        console.log("error" + error);
      }
    );
  }
}
