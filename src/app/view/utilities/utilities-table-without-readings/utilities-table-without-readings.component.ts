import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Utility} from "../../../model/utility";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {UtilitiesService} from "../../../controller/utilities.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WaitComponent} from "../../wait/wait.component";

@Component({
  selector: 'app-entrance-edit',
  templateUrl: 'internet-edit.html',
  styleUrls: ['../utilities-table/dialog-css.scss'],
})
export class UtilityEditComponentWithoutReading implements OnInit {

  constructor(private http: UtilitiesService,
              @Inject(MAT_DIALOG_DATA) public utility: Utility,
              private dialog: MatDialog) {
  }

  currentMonthCondition: boolean;
  isAdmin: boolean;
  closeDialog = false;

  formGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    photoURL: new FormControl('', Validators.required)
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
    console.log(this.utility);
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
  selector: 'app-utilities-table-without-readings',
  templateUrl: './utilities-table-without-readings.component.html',
  styleUrls: ['../utilities-table/utilities-table.component.scss']
})
export class UtilitiesTableWithoutReadingsComponent implements OnInit {

  @Input() utilitiesTable: Utility[];

  constructor(public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['month', 'tariff', 'amountToPay',
    'attachPhoto', 'status', 'actions'];

  ngOnInit(): void {
  }

  openEditDialog(utility: Utility): void {
    const dialogRef = this.dialog.open(UtilitiesTableWithoutReadingsComponent, {
      data: utility,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
