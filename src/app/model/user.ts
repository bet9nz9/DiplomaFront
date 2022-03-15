import {Role} from './role';
import {BaseEntity} from './baseEntity';

export class User extends BaseEntity{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  isActive: string;
  receiveUtilityNotification: string;
  activationCode: string;
  userToAddress: any;
  role: Role;

  constructor(obj: any) {
    super(obj);
    if(obj != null) {
      this.email = obj && obj.email || null;
      this.password = obj && obj.password || null;
      this.firstName = obj && obj.firstName || null;
      this.lastName = obj && obj.lastName || null;
      this.patronymic = obj && obj.patronymic || null;
      this.isActive = obj && obj.isActive || null;
      this.receiveUtilityNotification = obj && obj.receiveUtilityNotification || null;
      this.activationCode = obj && obj.activationCode || null;
      this.userToAddress = obj && obj.userToAddress || null;
      this.role = obj && obj.role || null;
    }
  }
}
