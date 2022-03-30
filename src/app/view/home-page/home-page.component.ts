import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../controller/notification.service';
import {Notifications} from '../../model/notifications';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ViewNoteComponent} from '../notifications/view-note/view-note.component';
import {AuthService} from '../../controller/auth.service';
import {User} from '../../model/user';
import {HttpParams} from "@angular/common/http";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public httpService: NotificationService,
              public dialog: MatDialog,
              private authService: AuthService) {
  }

  displayedColumns: string[] = ['title', 'text', 'action'];
  notifications: Notifications[] = [];
  notes: Notifications[] = [];
  flexWheel: boolean = true;
  isAuthority: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isNoGuest: boolean;
  currentUser = new User(null);
  totalElements: number;
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 5, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 5, color: 'white'},
    {text: 'Three', cols: 4, rows: 2, color: 'lightblue'},
  ];

  ngOnInit(): void {
    this.isAuthority = localStorage.getItem('Authorization') !== null;
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.isUser = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'user';
    this.isNoGuest = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') !== 'guest';
    if (this.isAuthority) {
      this.getCurrentUser();
    }
  }

  getNotes(): void {
    let params = new HttpParams().append('page', '0')
      .append('size', '5')
      .append('sort', 'date:DESC');
    this.httpService.getData(params).subscribe(
      (response) => {
        // @ts-ignore
        this.notifications = this.getShortNote(response.content);
        // @ts-ignore
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  getCurrentUser(): void {
    if (this.currentUser.id === undefined) {
      this.authService.current().subscribe((response) => {
        this.currentUser = response;
        this.getNotes();
      });
    }
  }


  showActualCategory(notifications: Notifications[]) {
    if (this.isNoGuest && this.isAuthority) {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].category.id !== 963) {
          this.notes.push(notifications[i]);
        }
      }
    } else {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].category.id === 963) {
          this.notes.push(notifications[i]);
        }
      }
    }
    notifications = this.notes;
    return notifications;
  }

  getShortNote(notifications: Notifications[]): Notifications[] {
    notifications = this.showActualCategory(notifications);
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].text.length != null && notifications[i].text.length > 30) {
        notifications[i].title = notifications[i].title.substring(0, 30) + ' ...';
        notifications[i].text = notifications[i].text.substring(0, 40) + ' ...';
      }
    }
    return notifications;
  }

  openFullNote(note: Notifications): void {
    const dialogRef = this.dialog.open(ViewNoteComponent, {
      data: note,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

