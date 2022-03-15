import {Component, Inject, OnInit} from '@angular/core';
import {NotificationService} from '../../../controller/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Notifications} from '../../../model/notifications';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-note-component',
  templateUrl: 'view-note.html',
  styleUrls: ['../dialog-css.scss'],
})
export class ViewNoteComponent implements OnInit{
  constructor(private http: NotificationService, @Inject(MAT_DIALOG_DATA) public note: Notifications) {}

  disable = false;
  closeDialog = false;

  ngOnInit(): void {
    this.http.getOneEntrance(this.note.id).subscribe(
      (response) => {
        this.note = response;
        this.disable = true;
      }
    );
  }
}
