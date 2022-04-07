import {Component, Input, OnInit} from '@angular/core';
import {UtilitiesService} from "../../../controller/utilities.service";
import {Utility} from "../../../model/utility";
import {HttpParams} from "@angular/common/http";
import {Service} from "../../../model/service";
import {Router} from "@angular/router";
import {Address} from "../../../model/address";
import {AddressService} from "../../../controller/address.service";
import {ServiceType} from "../../../model/serviceType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../controller/user.service";

interface Util {
  value: number;
  viewValue: Utility;
}

@Component({
  selector: 'app-utilities-info-box',
  templateUrl: './utilities-info-box.component.html',
  styleUrls: ['./utilities-info-box.component.scss']
})
export class UtilitiesInfoBoxComponent implements OnInit {

  constructor(public userServicesService: UtilitiesService,
              private addressService: AddressService,
              private router: Router) {
  }

  requestStatus = false;

  amountToPayPerMonth = 0;
  nextMonthAmountToPay = 0;
  debts: Utility[];
  params: HttpParams;
  utilsBankBooks: Util[];

  address: Address;
  addressId: number;
  userServices: Service [];
  services: ServiceType [];
  isAdmin: boolean;
  flexWheel: boolean;
  disable = false;

  formGroup = new FormGroup({
    a: new FormControl(),
    b: new FormControl(),
    c: new FormControl(),
    d: new FormControl()
  });

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.addressId = +this.router.url.split('/').pop();
    this.params = new HttpParams().append('address', this.addressId.toString());
    this.addressService.getById(this.addressId).subscribe((address) => {
      this.address = address;
      this.userServicesService.getServices(this.params).subscribe((services) => {
        //@ts-ignore
        this.userServices = services.content;
        this.requestStatus = true;
        this.flexWheel = false;
        this.userServicesService.getServicesTypes().subscribe((responce) => {
          //@ts-ignore
          this.services = responce.content;
          this.newServiceRef = this.services[1];
          this.disable = true;
        })
      })
    });
    //this.getServicesTypes();
    //this.getUserServices();
    //this.getLastUtilities();
  }

  getUserServices(): void {
    this.userServicesService.getServices(this.params).subscribe((services) => {
      //@ts-ignore
      this.userServices = services.content;
      this.requestStatus = true;
      this.flexWheel = false;
    })
  }

  getServicesTypes(): void {
    this.userServicesService.getServicesTypes().subscribe((responce) => {
      //@ts-ignore
      this.services = responce.content;
      this.newServiceRef = this.services[1];
    })
  }

  userService = new Service(null);
  title: string;
  tariff: number;
  bankBook: string;

  newServiceRef: ServiceType;

  createUserServices(userService: Service): void {
    this.userService = userService;
  }

  getLastUtilities(): void {
    this.params = new HttpParams().append('page', '0')
      .append('size', '5')
      .append('sort', 'dateAndTime:ASC');
    let date = new Date();
    let currentMonth = date.getTime().toString();
    date.setDate(date.getMonth() - 1);
    // let lastMonth = 'date=' + date.getTime();
    //let lastMonth = 'sort=date:ASC';
    this.userServicesService.getData(this.params).subscribe(
      (response) => {
        // @ts-ignore
        let util = response.content;
        // for (let i = 0; i < util.length; i++) {
        //   this.nextMonthAmountToPay += util[i].amountToPay;
        // }
        this.utilsBankBooks = [
          {value: 1, viewValue: util[0]},
          {value: 2, viewValue: util[1]},
          {value: 3, viewValue: util[2]},
          {value: 4, viewValue: util[3]},
          {value: 5, viewValue: util[4]},
        ];
        console.log(this.utilsBankBooks);

        let parameter = new HttpParams().append('dateAndTime', currentMonth);
        this.userServicesService.getData(parameter).subscribe(
          (response) => {
            //@ts-ignore
            let utils = response.content;
            for (let i = 0; i < utils.length; i++) {
              if (utils[i].status === false && utils[i].endMonthReading !== null) {
                this.amountToPayPerMonth += utils[i].amountToPay;
              }
            }
          }
        );
        this.getDebt();
        this.requestStatus = true;
      },
      (error) => {
        console.log('error occupied : ' + error);
      }
    );
  }

  getDebt(): void {
    this.params = new HttpParams().append('address', this.addressId.toString())
      .append('status', 'false');
    //let search = 'address=='+this.addressId+'&status=false';

    this.userServicesService.getData(this.params).subscribe((response) => {
      // @ts-ignore
      this.debts = this.parseDate(response.content);
      console.log(this.debts);
    });

  }

  parseDate(utilities: Utility[]): Utility[] {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < utilities.length; i++) {
      utilities[i].dateAndTime = new Date(utilities[i].dateAndTime);
      // @ts-ignore
      utilities[i].date = this.datePipe.transform(utilities[i].date, 'MMM y');
    }
    return utilities;
  }

  openAddDialog(): void {

  }

  openEditDialog(): void {

  }

  hideField(): void {

  }

}
