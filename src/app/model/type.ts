import {BaseEntity} from './baseEntity';

export class Type extends BaseEntity{
  value: string;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.value = obj && obj.value || null;
    }
  }
}
