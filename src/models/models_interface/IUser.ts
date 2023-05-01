import { EnumGender } from '../../enums/gender.enum';
import { EnumRole } from '../../enums/role.enum';
import { IPet } from './IPet';

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  gender: EnumGender;
  role: EnumRole;
  password: string;
  pets?: IPet[];
}
