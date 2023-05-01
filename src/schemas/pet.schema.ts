import { string, nativeEnum, number, object } from 'zod';
import { EnumCharacteristic } from '../enums/characteristic.enum';
import { EnumRace } from '../enums/race.enum';
import { EnumSexPet } from '../enums/sexPet.enum';

export const petSchema = object({
  name: string({ required_error: 'Pet name is required' }),
  race: nativeEnum(EnumRace, { required_error: 'Pet race is required' }),
  birthDate: string().nonempty({ message: 'Pet birth date is required' }),
  description: string().nonempty({ message: 'Pet description is required' }),
  sex: nativeEnum(EnumSexPet, { required_error: 'Pet sex is required' }),
  rating: number()
    .min(0, { message: 'Pet rating cannot be negative' })
    .max(5, { message: 'Pet rating cannot be greater than 5' }),
  characteristic: nativeEnum(EnumCharacteristic, {
    required_error: 'Pet characteristic is required',
  }),
});
