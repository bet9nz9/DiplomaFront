import {Type} from './type';
import {Building} from './building';
import {BaseEntity} from './baseEntity';

export class Entrance extends BaseEntity{
  type: Type;
  building: Building;
  status: boolean;
  active: boolean;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.type = obj && obj.type || null;
      this.building = obj && obj.building || null;
      this.status = obj && obj.status || null;
      this.active = obj && obj.active || null;
    }
  }
}
