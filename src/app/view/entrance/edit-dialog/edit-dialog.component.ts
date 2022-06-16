import {Component, Inject, OnInit} from '@angular/core';
import {EntranceService} from '../../../controller/entance.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Entrance} from '../../../model/entrance';
import {TypeService} from '../../../controller/type.service';
import {BuildingService} from '../../../controller/building.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Building} from '../../../model/building';
import {Type} from '../../../model/type';
import {WaitComponent} from '../../wait/wait.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(private entranceService: EntranceService,
              @Inject(MAT_DIALOG_DATA) public entrance: Entrance,
              private typeService: TypeService,
              private buildingService: BuildingService,
              private dialog: MatDialog) {}

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    typeForm: new FormControl('', Validators.required),
    buildingForm: new FormControl('', Validators.required),
    activeForm: new FormControl('', Validators.required)
  });

  types: Type[] = [];
  buildings: Building[] = [];
  buildingName: string;
  typeName: string;
  disable = false;
  status: string;

  ngOnInit(): void {
    this.entranceService.getOneEntrance(this.entrance.id).subscribe(
      (response) => {
        this.entrance = response;
        this.buildingName = this.entrance.building.name;
        this.typeName = this.entrance.entranceType.name;
        this.status = String(this.entrance.status);
      }
    );
    this.typeService.getAll().subscribe(
      (response) =>
      {
        // @ts-ignore
        this.types = response.content;
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );
    this.buildingService.getAll().subscribe(
      (response) =>
      {
        // @ts-ignore
        this.buildings = response.content;
        this.disable = true;
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );
  }

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  updateEntr(): void{
    this.openWaitDialog();
    let i;
    for (i = 0; i < this.types.length; i++) {
      if (this.typeName === this.types[i].name) { this.entrance.entranceType = this.types[i]; }
    }
    for (i = 0; i < this.buildings.length; i++) {
      if (this.buildingName === this.buildings[i].name) { this.entrance.building = this.buildings[i]; }
    }
    this.entranceService.updateEntrance(this.entrance).subscribe((data) =>
    {
      this.dialog.closeAll();
    }, (error) =>
      {
        console.log('error' + error);
      }
    );
  }
}
