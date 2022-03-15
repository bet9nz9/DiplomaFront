import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../../model/address";
import {Utility} from "../../../model/utility";
import {Service} from "../../../model/service";
import {UtilitiesService} from "../../../controller/utilities.service";
import {AddressService} from "../../../controller/address.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {WaitComponent} from "../../wait/wait.component";

@Component({
  selector: 'app-utilities-add',
  templateUrl: './utilities-add.component.html',
  styleUrls: ['./utilities-add.component.scss']
})
export class UtilitiesAddComponent implements OnInit {

  constructor(private utilitiesService: UtilitiesService,
              @Inject(MAT_DIALOG_DATA) public addressId: number,
              private addressesService: AddressService,
              private dialog: MatDialog) {
  }

  services: Service[] = [];
  address: Address;
  disable = false;
  serviceName: string;

  utility = new Utility(null);

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.utilitiesService.getServices().subscribe(
      (responseServices) => {
        // @ts-ignore
        this.services = responseServices.content;

        this.addressesService.getById(this.addressId).subscribe(
          (response) => {
            // @ts-ignore
            this.address = response;
            console.log(this.address);
          }
        );

        console.log(this.services);
        this.disable = true;
      }
    );
  }

  formGroup = new FormGroup({
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl('', Validators.required),
    bankBook: new FormControl(this.utility.bankBook, [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    service: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    picker: new FormControl(this.utility.date, [
      Validators.required,
      Validators.pattern('([0-1][0-9])\\/([0-3][0-9])\\/(20(\\d{2}))')
    ]),
    startMonthReading: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ])
  });

  openWaitDialog(): void {
    const dialogRef = this.dialog.open(WaitComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  createUtility(): void {
    this.openWaitDialog();
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].name === this.serviceName) {
        this.utility.service = this.services[i];
      }
    }

    this.utility.address = this.address;

    this.utilitiesService.createUtility(this.utility).subscribe((data) => {
      this.dialog.closeAll();
      location.reload();
    });
  }

}
