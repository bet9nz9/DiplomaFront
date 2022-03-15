import {BaseEntity} from './baseEntity';
import {Service} from './service';
import {Address} from './address';

export class Utility extends BaseEntity{
  bankBook: string;
  date: Date;
  endMonthReading: number;
  startMonthReading: number;
  amountToPay: number;
  status: boolean;
  photoURL: string;
  service: Service;
  address: Address;

  constructor(obj: any) {
    super(obj);
    this.bankBook = obj && obj.bankBook || null;
    this.date = obj && obj.date || null;
    this.endMonthReading = obj && obj.endMonthReading || null;
    this.startMonthReading = obj && obj.startMonthReading || null;
    this.amountToPay = obj && obj.amountToPay || null;
    this.status = obj && obj.status || null;
    this.photoURL = obj && obj.photoURL || null;
    this.service = obj && obj.service || null;
    this.address = obj && obj.address || null;
  }
}
