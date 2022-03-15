import {BaseEntity} from './baseEntity';

export class Service extends BaseEntity{
  title: string;
  tariff: number;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.title = obj && obj.title || null;
      this.tariff = obj && obj.tariff || null;
    }
  }
}
