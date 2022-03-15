import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {User} from '../../model/user';
import {UserService} from '../../controller/user.service';
import {WaitComponent} from '../wait/wait.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: User,
              private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  deleteUser() {
    this.openWaitDialog();
    this.userService.deleteUser(this.user.id).subscribe((response) => {
      this.dialog.closeAll();
    })
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
