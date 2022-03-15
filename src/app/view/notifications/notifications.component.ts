import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Notifications} from '../../model/notifications';
import {NotificationService} from '../../controller/notification.service';
import {DatePipe} from '@angular/common';
import {ViewNoteComponent} from './view-note/view-note.component';
import {AddDialogNotificationComponent} from './add-notification/add-dialog-notification.component';
import {AddDialogCategory} from '../category/add-category/add-dialog-category.component';
import {User} from '../../model/user';
import {AuthService} from '../../controller/auth.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../controller/category.service';
import {DialogCategory} from '../category/category.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['date', 'categoryId', 'createdBy', 'title', 'text', 'actions'];
  notifications: Notifications[] = [];
  myNotifications = false;
  currentSorting = false;
  isChecked = true;
  flexWheel: boolean;
  flexWheel1 = true;
  totalElements: number;
  currPage = 0;
  currSize = 5;
  currentUser = new User(null);
  categories: Category[];
  categoryName: string;
  searchByCategory: string;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCategories();
  }

  constructor(public dialog: MatDialog,
              public httpService: NotificationService,
              public categoryService: CategoryService,
              private datePipe: DatePipe,
              public authService: AuthService) {
  }

  find(): void {
    let search;
    if (this.myNotifications) {
      search = 'createdBy==' + this.currentUser.id;
    }
    if (this.currentSorting) {
      search = search + '&sort=date:ASC';
    } else {
      search = search + '&sort=date:DESC';
    }
    if (this.searchByCategory !== null) {
      search = search + '&' + this.searchByCategory;
    }
    this.flexWheel = true;
    this.httpService.getDataBy(search, this.currPage, this.currSize).subscribe(
      (response) => {
        // @ts-ignore
        this.notifications = this.dateConversion(response.content);
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
        // this.curSort = true;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );

  }

  changeSorting(): void{
    this.currentSorting = !this.currentSorting;
    this.find();
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe((categoryResponse) => {
      // @ts-ignore
      this.categories = categoryResponse.content;
    });
  }

  categoryChange(): void {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === this.categoryName) {
        this.searchByCategory = 'categoryId==' + this.categories[i].id;
        break;
      } else {
        this.searchByCategory = null;
      }
    }
    this.find();
  }

  getCurrentUser(): void {
    if (this.currentUser.id === undefined) {
      this.authService.current().subscribe((response) => {
        this.currentUser = response;
        this.find();
        this.flexWheel1 = false;
      });
    }
  }

  changeCurSort(): void {
    this.myNotifications = !this.myNotifications;
    this.find();
  }

  OpenFullNote(note: Notifications): void {
    const dialogRef = this.dialog.open(ViewNoteComponent, {
      data: note,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCategories(): void {
    const dialogRef = this.dialog.open(DialogCategory);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.find();
    });
  }

  // tslint:disable-next-line:typedef
  dateConversion(notifications: Notifications[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < notifications.length; i++) {
      notifications[i].date = new Date(notifications[i].date);
      // @ts-ignore
      notifications[i].date = this.datePipe.transform(notifications[i].date, 'dd.MM.yyyy HH:mm');

      if (notifications[i].text.length != null && notifications[i].text.length > 20) {
        notifications[i].title = notifications[i].title.substring(0, 20) + ' ...';
        notifications[i].text = notifications[i].text.substring(0, 30) + ' ...';
      }
    }
    return notifications;
  }

  addNotification(): void {
    const dialogRef = this.dialog.open(AddDialogNotificationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.find();
  }
}
