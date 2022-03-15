import { Component, OnInit } from '@angular/core';
import {EntranceService} from '../../../controller/entance.service';
import {TypeService} from '../../../controller/type.service';
import {BuildingService} from '../../../controller/building.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Entrance} from '../../../model/entrance';
import {Type} from '../../../model/type';
import {Building} from '../../../model/building';
import {MatDialog} from '@angular/material/dialog';
import {WaitComponent} from '../../wait/wait.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  constructor(private entranceService: EntranceService,
              private typeService: TypeService,
              private buildingService: BuildingService,
              private dialog: MatDialog) {}

  types: Type[] = [];
  buildings: Building[] = [];
  disable = false;

  ngOnInit(): void {
    this.typeService.getAll().subscribe(
      (response) =>
      {
        //@ts-ignore
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
        //@ts-ignore
        this.buildings = response.content;
        this.disable = true;
      },
      (error) =>
      {
        console.log('error occupied : ' + error);
      }
    );
  }

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    typeForm: new FormControl('', Validators.required),
    buildingForm: new FormControl('', Validators.required),
    // roleForm: new FormControl('', Validators.required),
    activeForm: new FormControl('', Validators.required)
  });


  entrance = new Entrance(null);

  openWaitDialog(): void{
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addEnt(): void{
    this.openWaitDialog();
    this.entranceService.addEntrance(this.entrance).subscribe(
      (response) =>
      {
        this.dialog.closeAll();
      }
    );
  }
}
