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

// Imports

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
export class User {
  readonly _id: string;

  @prop({ required: true })
  userName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true, unique: true, lowercase: true })
  email: string;

  @prop({ required: true, unique: true })
  phoneNumber: string;

  @prop({ default: 'user' })
  role: string;

  @prop({ required: true, select: false })
  password: string;

  @prop({ required: true })
  passwordConfirm: string | undefined;

  @prop({ default: true, select: false })
  verified: boolean;

  static async comparePasswords(
    hashedPassword: string,
    candidatePassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const UserModel = getModelForClass<typeof User>(User);
export default UserModel;
