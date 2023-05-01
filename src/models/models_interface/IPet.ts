import { EnumCharacteristic } from '../../enums/characteristic.enum';
import { EnumRace } from '../../enums/race.enum';
import { EnumSexPet } from '../../enums/sexPet.enum';

export interface IPet {
  name: string;
  race: EnumRace;
  birthDate: string;
  description: string;
  sex: EnumSexPet;
  rating: number;
  characteristic: EnumCharacteristic;
}
