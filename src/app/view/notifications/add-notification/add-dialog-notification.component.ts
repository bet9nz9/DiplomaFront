import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../controller/notification.service';
import {CategoryService} from '../../../controller/category.service';
import {UserService} from '../../../controller/user.service';
import {AuthService} from '../../../controller/auth.service';
import {User} from '../../../model/user';
import {Category} from '../../../model/category';
import {Notifications} from '../../../model/notifications';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-notification-add',
  templateUrl: 'notification-add.html',
  styleUrls: ['../dialog-css.scss'],
})
export class AddDialogNotificationComponent implements OnInit{
  constructor(private httpService: NotificationService,
              private categoryService: CategoryService,
              private userService: UserService,
              public authService: AuthService){}
  email: string;
  users: User[] = [];
  categories: Category[] = [];
  notification = new Notifications(null);
  flexWheel = false;
  userName: string;
  categoryName: string;
  isAuthority: boolean;
  currentUser = new User(null);

  formGroup = new FormGroup({
    titleForm: new FormControl('', Validators.required),
    categoryForm: new FormControl('', Validators.required),
    textForm: new FormControl('', Validators.required)
  });

  addNotification(): void{
    let i = 0;
    this.notification.date = new Date();
    // console.log(this.notification);
    for (i = 0; i < this.users.length; i++) {
      if (this.userName === this.users[i].name) { this.notification.createdBy = this.users[i]; }
    }
    for (i = 0; i < this.categories.length; i++) {
      if (this.categoryName === this.categories[i].name) { this.notification.category = this.categories[i]; }
    }
    this.notification.name = 'Notification';
    this.notification.description = 'Description';
    this.notification.createdBy = this.currentUser;
    this.httpService.addNotification( this.notification).subscribe(data => {
      // console.log(data);
      location.reload();
    });
  }

  getCurrentUser(): void {
    if (this.currentUser.id === undefined) {
      this.authService.current().subscribe((response) => {
        this.currentUser = response;
      });
    }
  }
  ngOnInit(): void {
    this.isAuthority = localStorage.getItem('Authorization') !== null;
    this.categoryService.getAll().subscribe((response) =>
      {
        // @ts-ignore
        this.categories = response.content;
        console.log(this.categories);
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );

    if (this.isAuthority) {
      this.getCurrentUser();
    }
    this.userService.getAll().subscribe((response) =>
      {
        // @ts-ignore
        this.users = response.content;

        this.flexWheel = true;
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );

  }
}
