import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Notifications} from '../../model/notifications';
import {NotificationService} from '../../controller/notification.service';
import {DatePipe} from '@angular/common';
import {ViewNoteComponent} from './view-note/view-note.component';
import {AddDialogNotificationComponent} from './add-notification/add-dialog-notification.component';
import {User} from '../../model/user';
import {AuthService} from '../../controller/auth.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../controller/category.service';
import {DialogCategory} from '../category/category.component';
import {HttpParams} from "@angular/common/http";

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
  params:  HttpParams;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCategories();
  }

  constructor(public dialog: MatDialog,
              public httpService: NotificationService,
              public categoryService: CategoryService,
              private datePipe: DatePipe,
              public authService: AuthService) {
    this.params = new HttpParams();
  }

  find(): void {
    this.params = this.params.append('page', this.currPage.toString())
      .append('size', this.currSize.toString());

    if (this.myNotifications) {
      this.params = this.params.append('createdBy', this.currentUser.id.toString());
    }

    if (this.currentSorting) {
      this.params = this.params.append('sort', 'dateAndTime:ASC');
    } else {
      this.params = this.params.append('sort', 'dateAndTime:DESC');
    }

    this.flexWheel = true;
    this.httpService.getDataBy(this.params).subscribe(
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
        this.params = this.params.append('categoryId', this.categories[i].id.toString())
        break;
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
      notifications[i].dateAndTime = new Date(notifications[i].dateAndTime);
      if (notifications[i].dateAndTime !== undefined){
        // @ts-ignore
        notifications[i].dateAndTime = this.datePipe.transform(notifications[i].dateAndTime, 'dd.MM.yyyy HH:mm');
      }

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
