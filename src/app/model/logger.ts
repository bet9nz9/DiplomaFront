import {Entrance} from './entrance';
import {Ekey} from './ekey';
import {BaseEntity} from './baseEntity';

export class Logger extends BaseEntity{
  dateAndTime: Date;
  message: string;
  entrance: Entrance;
  eKey: Ekey;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.entrance = obj && obj.entrance || null;
      this.eKey = obj && obj.eKey || null;
      this.dateAndTime = obj && obj.dateAndTime || null;
      this.message = obj && obj.message || null;
    }
  }
}
