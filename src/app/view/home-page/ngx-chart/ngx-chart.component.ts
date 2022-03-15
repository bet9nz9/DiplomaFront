import {Component, Input, OnInit} from '@angular/core';
import {AddressService} from '../../../controller/address.service';
import {Address} from '../../../model/address';
import {User} from '../../../model/user';
import {UtilitiesService} from '../../../controller/utilities.service';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-ngx-chart',
  templateUrl: './ngx-chart.component.html',
  styleUrls: ['./ngx-chart.component.scss']
})
export class NgxChartComponent implements OnInit {

  constructor(private addressesService: AddressService,
              private utilitiesService: UtilitiesService) {
  }

  userAddresses: Address[] = [];
  @Input() currentUser = new User(null);
  chartIsReady = false;
  currentAddress: Address;

  ngOnInit(): void {
    this.addressesService.getAddressesByUser(this.currentUser.id).subscribe((response) => {
      // @ts-ignore
      this.userAddresses = response.content;
      this.getUtilitiesByAddress(this.userAddresses[0]);
    });
  }

  colorScheme = {
    domain: ['yellow', 'red', 'blue', 'chocolate', 'dodgerblue']
  };

  view: any[] = [700, 400];
  values: number[] = [];
  chartData: ChartData[] = [];
  names: string[] = ['Электричество', 'Газ', 'Вода', 'ОСМД', 'Интернет']

  onSelect(data): void {
    for (let i = 0; i < this.chartData.length; i++) {
      if (this.chartData[i].name == data.name) {
        this.chartData[i].value == 0 ? this.chartData[i].value = this.values[i] : this.chartData[i].value = 0;
      }
    }
    this.chartData = [...this.chartData];
  }

  getUtilitiesByAddress(address: Address): void {
    this.currentAddress = address;
    this.chartIsReady = false;
    let newChartData: ChartData[] = [];
    let i = 0;
    this.utilitiesService.getData(0, 5, 'address==' + address.id, 0)
      .subscribe((response) => {
        console.log(response);
        // @ts-ignore
        for(i=0; i<response.content.length; i++) {
          // @ts-ignore
          newChartData[i] = {name: this.names[i], value: response.content[i].amountToPay}
        }
        this.chartData = newChartData;
        for (i = 0; i<this.chartData.length; i++) {
          this.values[i] = this.chartData[i].value;
        }
        this.chartIsReady = true;
      });
  }

}
