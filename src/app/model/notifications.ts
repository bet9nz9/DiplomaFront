import {BaseEntity} from './baseEntity';
import {Category} from './category';
import {User} from './user';

export class Notifications extends BaseEntity{
  text: string;
  dateAndTime: Date;
  title: string;
  category: Category;
  createdBy: User;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.text = obj && obj.text || null;
      this.dateAndTime = obj && obj.dateAndTime || null;
      this.title = obj && obj.title || null;
      this.category = obj && obj.category || null;
      this.createdBy = obj && obj.createdBy || null;
    }
  }
}
