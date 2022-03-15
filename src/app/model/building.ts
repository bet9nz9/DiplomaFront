import {BaseEntity} from './baseEntity';

export class Building extends BaseEntity{
  number: number;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.number = obj && obj.number || null;
    }
  }
}
