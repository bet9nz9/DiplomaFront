import {Entrance} from './entrance';
import {Ekey} from './ekey';
import {BaseEntity} from './baseEntity';

export class Logger extends BaseEntity{
  date: Date;
  time: Date;
  entranceId: Entrance;
  eKeyId: Ekey;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.entranceId = obj && obj.entranceId || null;
      this.eKeyId = obj && obj.eKeyId || null;
      this.date = obj && obj.date || null;
      this.time = obj && obj.time || null;
    }
  }
}
