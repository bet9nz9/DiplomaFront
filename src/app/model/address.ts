import {BaseEntity} from './baseEntity';
import {Building} from './building';
import {User} from './user';

export class Address extends BaseEntity{
  flat: string;
  building: Building;
  apartmentNumber: number;
  user: User;

  constructor(obj: any) {
    super(obj);
    this.flat = obj && obj.flat || null;
    this.building = obj && obj.building || null;
    this.apartmentNumber = obj && obj.apartmentNumber || null;
    this.user = obj && obj.user || null;
  }
}
