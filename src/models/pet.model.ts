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
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  race: EnumRace;

  @prop({ required: true })
  birthDate: string;

  @prop()
  description?: string;

  @prop({ default: 5 })
  rating?: number;

  @prop({ required: true })
  sex: EnumSexPet;

  @prop({ default: EnumCharacteristic.UNDEFINED })
  characteristic: EnumCharacteristic;
}

const PetModel = getModelForClass<typeof Pet>(Pet);

export default PetModel;
