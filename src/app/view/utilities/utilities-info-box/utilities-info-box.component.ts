import {Component, Input, OnInit} from '@angular/core';
import {UtilitiesService} from "../../../controller/utilities.service";
import {Utility} from "../../../model/utility";

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

  constructor(public httpServer: UtilitiesService) {
  }

  @Input() addressId: number;

  requestStatus = false;

  amountToPayPerMonth = 0;
  nextMonthAmountToPay = 0;
  debts: Utility[];

  utilsBankBooks: Util[];

  ngOnInit(): void {
    this.getLastUtilities();
  }

  getLastUtilities(): void {
    let date = new Date();
    let currentMonth = 'date=' + date.getTime();
    date.setDate(date.getMonth() - 1);
    // let lastMonth = 'date=' + date.getTime();
    let lastMonth = 'sort=date:ASC';
    this.httpServer.getData(0, 5, lastMonth, null).subscribe(
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

        this.httpServer.getData(null, null, currentMonth, null).subscribe(
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

  getDebt(): void{
    let search = 'address=='+this.addressId+'&status=false';

    this.httpServer.getData(null, null, search, null).subscribe((response) => {
      // @ts-ignore
      this.debts = this.parseDate(response.content);
      console.log(this.debts);
    });

  }

  parseDate(utilities: Utility[]): Utility[] {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < utilities.length; i++) {
      utilities[i].date = new Date(utilities[i].date);
      // @ts-ignore
      utilities[i].date = this.datePipe.transform(utilities[i].date, 'MMM y');
    }
    return utilities;
  }

}
