import {
  Severity,
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { EnumRace } from '../enums/race.enum';
import { EnumCharacteristic } from '../enums/characteristic.enum';
import { EnumSexPet } from '../enums/sexPet.enum';
import { IPet } from './models_interface/IPet';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ id: 1 })
export class Pet implements IPet {
  readonly _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  race: EnumRace;

  @prop({ required: true })
  birthDate: string;

  @prop({ required: true })
  dateOfBirth: Date;

  @prop({ required: false })
  description: string;

  @prop({ required: false })
  rating: number;

  @prop({ required: true })
  sex: EnumSexPet;

  @prop({ default: 'undefined' })
  characteristic: EnumCharacteristic;
}

const PetModel = getModelForClass<typeof Pet>(Pet);

export default PetModel;
