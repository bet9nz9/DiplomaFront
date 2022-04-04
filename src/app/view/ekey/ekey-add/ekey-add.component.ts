import { Component, OnInit } from '@angular/core';
import {EKeyService} from '../../../controller/eKey.service';
import {UserService} from '../../../controller/user.service';
import {User} from '../../../model/user';
import {Ekey} from '../../../model/ekey';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WaitComponent} from '../../wait/wait.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-ekey-add',
  templateUrl: './ekey-add.component.html',
  styleUrls: ['./ekey-add.component.scss']
})
export class EkeyAddComponent implements OnInit {

  constructor(private eKeyService: EKeyService,
              private userService: UserService,
              private dialog: MatDialog) { }

  users: User[] = [];
  flexWheel = false;
  eKey = new Ekey(null);

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    keyCodeForm: new FormControl('', Validators.required),
    activeForm: new FormControl('', Validators.required)
  });


  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (response) =>
      {
        // @ts-ignore
        this.users = response.content;
        this.flexWheel = true;
      }, (error => console.log('error occupied: '+ error))
    );
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addEKey(): void {
    this.openWaitDialog();
    debugger
    this.eKeyService.addKey(this.eKey).subscribe(
      (response) => {
        this.dialog.closeAll();
      }, (error) => {
        console.log('error occupied: '+ error)
      }
    )
  }
}
