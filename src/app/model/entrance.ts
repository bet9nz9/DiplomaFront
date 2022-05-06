import {Type} from './type';
import {Building} from './building';
import {BaseEntity} from './baseEntity';

export class Entrance extends BaseEntity{
  entranceType: Type;
  building: Building;
  status: boolean;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.entranceType = obj && obj.entranceType || null;
      this.building = obj && obj.building || null;
      this.status = obj && obj.status || null;
    }
  }
}
