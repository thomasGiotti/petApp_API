import { string, nativeEnum, number, object, TypeOf } from 'zod';
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

export const createPetSchema = object({
  body: object({
    name: string({ required_error: 'Pet name is required' }),
    race: nativeEnum(EnumRace, { required_error: 'Pet race is required' }),
    birthDate: string({ required_error: 'Pet birth date is required' }),
    description: string().optional(),
    sex: nativeEnum(EnumSexPet, { required_error: 'Pet sex is required' }),
    rating: number()
      .min(0, { message: 'Pet rating cannot be negative' })
      .max(5, { message: 'Pet rating cannot be greater than 5' })
      .optional(),
    characteristic: nativeEnum(EnumCharacteristic, {
      required_error: 'Pet characteristic is required',
    }),
  }),
});

export const updatePetSchema = object({
  body: object({
    name: string().optional(),
    race: nativeEnum(EnumRace).optional(),
    birthDate: string().optional(),
    description: string().optional(),
    sex: string().optional(),
    rating: number()
      .min(0, { message: 'Pet rating cannot be negative' })
      .max(5, { message: 'Pet rating cannot be greater than 5' })
      .optional(),
    characteristic: nativeEnum(EnumCharacteristic).optional(),
  }),
});

export type CreatePetInput = TypeOf<typeof createPetSchema>['body'];
export type UpdatePetInput = TypeOf<typeof updatePetSchema>['body'];
