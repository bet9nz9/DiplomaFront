import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WaitComponent} from "../../wait/wait.component";
import {UserService} from "../../../controller/user.service";
import {User} from "../../../model/user";
import {AuthService} from "../../../controller/auth.service";
import {PopupComponent} from "./popup-check/popup.component";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  constructor(private addressesService: UserService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  disable = false;
  user = new User(null);

  ngOnInit(): void {
    this.disable = true;
  }

  formGroup = new FormGroup({
    email: new FormControl(this.user.email, Validators.email),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required)
  });

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  createUser(): void {
    this.authService.addUser(this.user).subscribe((data) => {
      this.dialog.closeAll();
    });
      const dialogRef = this.dialog.open(PopupComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

}
