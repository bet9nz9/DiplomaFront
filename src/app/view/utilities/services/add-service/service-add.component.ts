import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UtilitiesService} from "../../../../controller/utilities.service";
import {ServiceType} from "../../../../model/serviceType";
import {WaitComponent} from "../../../wait/wait.component";
import {Service} from "../../../../model/service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../../controller/address.service";
import {Address} from "../../../../model/address";

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {

  constructor(private servicesService: UtilitiesService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public addressId: number,
              private addressService: AddressService) {
  }

  servicesTypes: ServiceType[];
  flexWheel = false;
  userService = new Service(null);
  address: Address;

  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    tariff: new FormControl('', Validators.required),
    bankBook: new FormControl('', Validators.required),
    serviceType: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.servicesService.getServicesTypes().subscribe((resp) => {
      //@ts-ignore
      this.servicesTypes = resp.content;
      this.flexWheel = true;
    })

    this.addressService.getById(this.addressId).subscribe((resp) =>{
      this.address = resp;
    })

  }

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addUserService(): void {
    this.userService.address = this.address;
    this.servicesService.createUserService(this.userService).subscribe(resp => {
      this.dialog.closeAll();
    }, (error) => {
      console.log('error occupied: '+ error)
    });
  }

}
