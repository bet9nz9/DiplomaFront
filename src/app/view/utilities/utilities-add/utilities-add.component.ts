import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../../model/address";
import {Utility} from "../../../model/utility";
import {Service} from "../../../model/service";
import {UtilitiesService} from "../../../controller/utilities.service";
import {AddressService} from "../../../controller/address.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {WaitComponent} from "../../wait/wait.component";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-utilities-add',
  templateUrl: './utilities-add.component.html',
  styleUrls: ['./utilities-add.component.scss']
})
export class UtilitiesAddComponent implements OnInit {

  constructor(private utilitiesService: UtilitiesService,
              @Inject(MAT_DIALOG_DATA) public addressId: number,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private addressesService: AddressService,
              private router: Router,
              private dialog: MatDialog) {
  }

  availableServices: Service[] = [];
  address: Address;
  disable = false;
  serviceName: string;
  hideReadingsField: boolean;

  utility = new Utility(null);

  ngOnInit(): void {
    this.hideReadingsField = false;
    this.addressId = +this.router.url.split('/').pop();
    this.addressesService.getById(this.addressId).subscribe(
      (response) => {
        // @ts-ignore
        this.address = response;
        this.getData();
        console.log(this.address);
      }
    );
  }

  hideField(): void {
    if (this.serviceName == 'Интернет' || this.serviceName == 'ОСМД') {
      this.hideReadingsField = true;
    } else {
      this.hideReadingsField = false;
    }
  }

  getData(): void {
    let params = new HttpParams().append('address', this.addressId.toString());
    this.utilitiesService.getServices(params).subscribe(
      (responseServices) => {
        // @ts-ignore
        this.availableServices = responseServices.content;
      }
    );
    this.disable = true;
  }

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    picker: new FormControl(this.utility.dateAndTime, [
      Validators.required,
      Validators.pattern('([0-1][0-9])\\/([0-3][0-9])\\/(20(\\d{2}))')]),
    startMonthReading: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ])
  })

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  createUtility(): void {
    this.openWaitDialog();
    for (let i = 0; i < this.availableServices.length; i++) {
      if (this.availableServices[i].title === this.serviceName) {
        this.utility.service = this.availableServices[i];
      }
    }

    this.utility.address = this.address;

    this.utilitiesService.createUtility(this.utility).subscribe((data) => {
      this.dialog.closeAll();
      location.reload();
    });
  }

}
