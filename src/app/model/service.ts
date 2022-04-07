import {BaseEntity} from './baseEntity';
import {ServiceType} from "./serviceType";
import {Address} from "./address";

export class Service extends BaseEntity{
  title: string;
  tariff: number;
  bankBook: string;
  serviceType: ServiceType;
  address: Address;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.title = obj && obj.title || null;
      this.tariff = obj && obj.tariff || null;
      this.bankBook = obj && obj.bankBook || null;
      this.serviceType = obj && obj.serviceType || null;
      this.address = obj && obj.address || null;
    }
  }
}
