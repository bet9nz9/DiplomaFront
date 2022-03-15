import {BaseEntity} from './baseEntity';

export class Category extends BaseEntity{
  important: boolean;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.important = obj && obj.important || null;
    }
  }
}
