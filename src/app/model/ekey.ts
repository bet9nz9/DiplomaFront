import {BaseEntity} from './baseEntity';
import {User} from './user';

export class Ekey extends BaseEntity{
  keyCode: string;
  isActive: boolean;
  user: User;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.keyCode = obj && obj.keyCode || null;
      this.isActive = obj && obj.isActive || null;
      this.user = obj && obj.user || null;
    }
  }
}
