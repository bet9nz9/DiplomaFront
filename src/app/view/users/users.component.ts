import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../controller/user.service';
import {User} from '../../model/user';
import {PageEvent} from '@angular/material/paginator';
import {SubmitComponent} from '../submit/submit.component';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastName', 'patronymic', 'email', 'role', 'edit', 'delete'];
  flexWheel: boolean;
  findName = '';
  findFor = '';
  currPage = 0;
  currSize = 5;
  totalElements: number;
  users: User[] = [];
  params: HttpParams;

  constructor(public userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.find();
  }

  find(): void {
    this.params = new HttpParams().append('page', this.currPage.toString())
      .append('size', this.currSize.toString())
      .append(this.findFor, this.findName);

    this.flexWheel = true;
    this.userService.getAllWithPagination(this.params).subscribe(
      (response) => {
        // @ts-ignore
        this.users = response.content;
        // @ts-ignore
        // tslint:disable-next-line:radix
        this.totalElements = parseInt(response.totalElements);
        this.flexWheel = false;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  getPaginatorData(event: PageEvent): void {
    this.currSize = event.pageSize;
    this.currPage = event.pageIndex;
    this.find();
  }

  openSubmitDialog(user: User): void {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

}
