import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AddressService} from "../../../controller/address.service";
import {Address} from "../../../model/address";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BuildingService} from "../../../controller/building.service";
import {WaitComponent} from "../../wait/wait.component";

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public buildingId: number,
              private buildingService: BuildingService,
              private addressesService: AddressService,
              private dialog: MatDialog) {
  }

  disable = false;
  address = new Address(null);

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.buildingService.getById(this.buildingId).subscribe(
      (response) => {
        // @ts-ignore
        this.address.building = response;
        console.log(this.address.building);
        this.disable = true;
      }
    );
  }

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl(this.address.flat, Validators.required),
    flat: new FormControl('', [
      Validators.required,
      Validators.pattern('([0-9]{1,2})'),
      Validators.maxLength(2),
    ]),
    apartmentNumber: new FormControl(this.address.apartmentNumber, [
      Validators.required,
      Validators.pattern('([0-9]{1,2})'),
      Validators.maxLength(2),
    ]),
  });

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  createAddress(): void {
    this.openWaitDialog();
    this.addressesService.createAddress(this.address).subscribe((data) => {
      this.dialog.closeAll();
      location.reload();
    });
  }

}
