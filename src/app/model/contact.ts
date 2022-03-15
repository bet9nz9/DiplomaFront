import {BaseEntity} from './baseEntity';
import {ContactType} from './contactType';
import {User} from './user';

export class Contact extends BaseEntity{
  value: string;
  contactType: ContactType;
  user: User;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.value = obj && obj.value || null;
      this.contactType = obj && obj.contactType || null;
      this.user = obj && obj.user || null;
    }
  }
}
