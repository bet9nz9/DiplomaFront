import {Type} from './type';
import {Building} from './building';
import {BaseEntity} from './baseEntity';

export class Entrance extends BaseEntity{
  entranceType: Type;
  building: Building;
  isOpen: boolean;
  isAvailable: boolean;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.entranceType = obj && obj.entranceType || null;
      this.building = obj && obj.building || null;
      this.isOpen = obj && obj.isOpen || null;
      this.isAvailable = obj && obj.isAvailable || null;
    }
  }
}
