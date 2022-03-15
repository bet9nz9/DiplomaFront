import {Component} from '@angular/core';
import {AuthService} from '../../../controller/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user';
import {MatDialog} from "@angular/material/dialog";
import {RegistryComponent} from "../registry/registry.component";
import {WaitComponent} from "../../wait/wait.component";
import {NotActivatedComponent} from "./not-activated/not-activated.component";
import {Router} from "@angular/router";
import {ErrorDialogComponent} from "../../../error-dialog/error-dialog.component";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {

  constructor(public authService: AuthService,
              public dialog: MatDialog,
              private router: Router) {
  }

  formGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });


  user = new User(null);
  currentUser = new User(null);

  auth(): void {
    this.openWaitDialog();
    this.authService.auth(this.user).subscribe((response) => {
      this.authService.logout();
      localStorage.setItem('Authorization', response.token);
      this.authService.current().subscribe((us) => {
        // console.log(us);
        this.currentUser = us;
        if (this.currentUser.activationCode !== null) {
          localStorage.removeItem('Authorization');
          const dialogRef = this.dialog.open(NotActivatedComponent);
          dialogRef.afterClosed().subscribe(result => {
          })
        } else {
          localStorage.setItem('currentUserRole', us.role.role);
          this.router.navigate(['./']);
          setTimeout(() => location.reload(), 500);
        }
      }, ((error) => {
        console.log('error1 occupied: ' + error);
      }));

    }, ((error) => {
      this.openErrorDialog();
      console.log('error2 occupied: ' + error);
    }));
  }

  openErrorDialog(): void{
    this.dialog.closeAll();
    this.dialog.open(ErrorDialogComponent);
  }

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  openRegistry(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(RegistryComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
