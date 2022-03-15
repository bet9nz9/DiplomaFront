import {BaseEntity} from './baseEntity';

export class Role extends BaseEntity{
role: string;

  constructor(obj: any) {
    super(obj);
    if (obj != null) {
      this.role = obj && obj.role || null;
    }
  }
}
