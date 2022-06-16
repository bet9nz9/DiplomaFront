import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ServiceEditComponent} from './update-service/service-edit.component';
import {ServiceAddComponent} from './add-service/service-add.component';
import {HttpParams} from "@angular/common/http";
import {UtilitiesService} from "../../../controller/utilities.service";
import {Service} from "../../../model/service";
import {ServiceType} from "../../../model/serviceType";
import {EkeyEditComponent} from "../../ekey/ekey-edit/ekey-edit.component";
import {EkeyAddComponent} from "../../ekey/ekey-add/ekey-add.component";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(private userServicesService: UtilitiesService,
              private router: Router,
              private dialog: MatDialog) {
  }

  userServices: Service[];
  servicesTypes: ServiceType[];
  addressId: number;
  params: HttpParams;
  flexWheel: boolean;
  isAdmin: boolean;

  ngOnInit() {
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.addressId = +this.router.url.split('/').pop();
    this.flexWheel = true;
    this.params = new HttpParams().append('address', this.addressId.toString());
    this.getData();
  }

  getData(): void {
    this.userServicesService.getServices(this.params).subscribe((result) => {
      //@ts-ignore
      this.userServices = result.content;
      this.userServicesService.getServicesTypes().subscribe((resp) => {
        //@ts-ignore
        this.servicesTypes = resp.content;
        this.flexWheel = false;
      })
    });
  }

  displayedColumns: string[] = ['title', 'tariff', 'bankBook', 'edit', 'delete'];

  openEditDialog(userService: Service): void {
    const dialogRef = this.dialog.open(ServiceEditComponent, {
      data: userService
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.getData();
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ServiceAddComponent, {
      data: this.addressId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.getData();
      }
    });
  }

  delete(serviceId: number): void {
    this.userServicesService.deleteUserService(serviceId).subscribe((resp) => {

    })
  }

}

