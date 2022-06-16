import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Service} from "../../../../model/service";
import {ServiceType} from "../../../../model/serviceType";
import {UtilitiesService} from "../../../../controller/utilities.service";

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userService: Service,
              private servicesTypes: UtilitiesService,
              private dialog: MatDialog) {
  }

  closeDialog = false;

  serviceTypes: ServiceType [];

  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    tariff: new FormControl('', Validators.required),
    bankBook: new FormControl('', Validators.required)
  });

  disable = false;

  ngOnInit(): void {
    this.servicesTypes.getServicesTypes().subscribe((resp) =>{
      //@ts-ignore
      this.serviceTypes = resp.content;
    })
  }

  updateService(): void {
    this.servicesTypes.updateUserService(this.userService).subscribe((resp) =>
      {
        this.dialog.closeAll();
      }, (error) =>
      {
        console.log("error" + error);
      }
    );
  }
}
