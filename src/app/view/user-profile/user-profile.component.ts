import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../controller/role.service';
import {Role} from '../../model/role';
import {EKeyService} from '../../controller/eKey.service';
import {Ekey} from '../../model/ekey';
import {UserService} from '../../controller/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/user';
import {EkeyAddComponent} from '../ekey/ekey-add/ekey-add.component';
import {MatDialog} from '@angular/material/dialog';
import {WaitComponent} from '../wait/wait.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private roleService: RoleService,
              private eKeyService: EKeyService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) { }

  isAdmin: boolean;
  isGuest: boolean;
  isUser: boolean;
  isGuard: boolean;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'admin';
    this.isGuest = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'guest';
    this.isUser = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'user';
    this.isGuard = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'guard';
    this.userId = +this.activatedRoute.snapshot.paramMap.get('userId');
    this.userService.getById(this.userId).subscribe(
      (response) => {
        this.user = response;
        this.roleService.getAll().subscribe(
          (response) =>
          {
            // @ts-ignore
            this.roles = response.content;
          },
          (error) =>
          {
            console.log('error occupied : ' + error);
          }
        );
        this.eKeyService.getEKeyByUserId(this.userId).subscribe(
          (response) =>
          {
            // @ts-ignore
            this.eKeys = response.content;
            this.flexWheel = true;
          }, (error) =>
          {
            console.log('error: ' + error);
          }
        );
      }, (error) => {
        console.log('error: ' + error)
      }
    );
  }

  actions = ['edit', 'submit'];
  currAction = this.actions[0];
  flexWheel = false;

  roles: Role[] = [];
  eKeys: Ekey[] = [];
  user = new User(null);

  disabled = true;
  userId: number;
  editing = false;
  roleEditing = false;

  edit(): void{
    if(this.currAction === this.actions[1]) {
      this.editing = true;
      this.disabled = true;
      this.currAction = this.actions[0];
      this.userService.updateUser(this.user).subscribe((response) => {
        this.editing = false;
        location.reload();
      });
    } else {
      this.disabled = false;
      this.currAction = this.actions[1];
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EkeyAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  roleEdit(role: Role): void {
    let newUser = new User(this.user);
    this.roleEditing = true;
    newUser.role = role;
    this.userService.updateUser(newUser).subscribe((response) => {
      this.roleEditing = false
      this.user.role = newUser.role;
    });
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  editEKey(eKey: Ekey): void {
    let newEkey = new Ekey(eKey);
    this.openWaitDialog();
    newEkey.isActive = !eKey.isActive;
    this.eKeyService.updateKey(eKey).subscribe((data) =>
      {
        eKey.isActive = newEkey.isActive;
        this.dialog.closeAll();
      }, (error) =>
      {
        console.log("error" + error);
      }
    );
  }
}
