import {BaseEntity} from './baseEntity';

export class Building extends BaseEntity{
  buildingNumber: number;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.buildingNumber = obj && obj.buildingNumber || null;
    }
  }
}
