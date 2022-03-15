import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../view/top-menu/auth-dialog/auth-dialog.component";

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(): void{
    this.dialog.closeAll();
    this.dialog.open(AuthDialogComponent);
  }

}
