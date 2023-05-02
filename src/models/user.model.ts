import {
  getModelForClass,
  prop,
  pre,
  ModelOptions,
  Severity,
  index,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import config from 'config';
import { IUser } from './models_interface/IUser';
import { EnumRole } from '../enums/role.enum';
import { EnumGender } from '../enums/gender.enum';
import { Pet } from './pet.model';

/**
 * @swagger
 * definitions:
 *  User:
 *    type:object
 *    properties:
 *      firstName:string
 */

@pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    config.get<number>('costFactor')
  );
  this.passwordConfirm = undefined;
  return next();
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ email: 1, phoneNumber: 1 })
export class User implements IUser {
  readonly _id: string;

  @prop({ required: true })
  userName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  gender: EnumGender;

  @prop({ required: false })
  birthDate: string;

  @prop({ required: true, unique: true, lowercase: true })
  email: string;

  @prop({ required: true, unique: true })
  phoneNumber: string;

  @prop({ default: EnumRole.USER })
  role: EnumRole;

  @prop({ required: true, select: false })
  password: string;

  @prop({ required: true })
  passwordConfirm: string | undefined;
  @prop({ type: () => Pet })
  pets?: Pet[];
  @prop({ default: true, select: false })
  verified: boolean;

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const UserModel = getModelForClass<typeof User>(User);
export default UserModel;
