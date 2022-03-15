import {Component, Inject, OnInit, ViewChild, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {Utility} from '../../../model/utility';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilitiesService} from '../../../controller/utilities.service';
import {WaitComponent} from "../../wait/wait.component";

@Component({
  selector: 'app-entrance-edit',
  templateUrl: 'utility-edit.html',
  styleUrls: ['./dialog-css.scss'],
})
export class UtilityEditComponent implements OnInit {

  constructor(private http: UtilitiesService,
              @Inject(MAT_DIALOG_DATA) public utility: Utility,
              private dialog: MatDialog) {
  }

  currentMonthCondition: boolean;
  isAdmin: boolean;
  closeDialog = false;

  formGroup = new FormGroup({
    endMonthReading: new FormControl(this.utility.endMonthReading, [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    startMonthReading: new FormControl(this.utility.startMonthReading, [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  disable = false;

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('currentUserRole')!==null && localStorage.getItem('currentUserRole') === 'admin';
    this.http.getOneUtility(this.utility.id).subscribe(
      (response) => {
        this.utility = response;
        this.disable = true;
      }
    );
    if (this.utility.endMonthReading != null) {
      this.currentMonthCondition = false;
    }
  }

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  updateUtility(): void {
    this.openWaitDialog();
    this.http.updateUtility(this.utility).subscribe((data) => {
      this.dialog.closeAll();
      location.reload();
    });
  }
}


@Component({
  selector: 'app-utilities-table',
  templateUrl: './utilities-table.component.html',
  styleUrls: ['./dialog-css.scss']
})
export class UtilitiesTableComponent implements OnInit {

  @Input() utilitiesTable: Utility[];

  constructor(public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['month', 'currentMonthReadings', 'lastMonthReadings', 'use'
    , 'tariff', 'amountToPay', 'attachPhoto', 'status', 'actions'];

  ngOnInit(): void {
  }

  openEditDialog(utility: Utility): void {
    const dialogRef = this.dialog.open(UtilityEditComponent, {
      data: utility,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
