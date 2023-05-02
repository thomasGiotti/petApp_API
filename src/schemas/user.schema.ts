import validator from 'validator';
import { object, string, TypeOf, nativeEnum, array } from 'zod';
import { EnumGender } from '../enums/gender.enum';
import { EnumRole } from '../enums/role.enum';
import { petSchema } from './pet.schema';

export const createUserSchema = object({
  body: object({
    userName: string({ required_error: 'userName is required' }),
    firstName: string({ required_error: 'firstName is required' }),
    lastName: string({ required_error: 'lastName is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    phoneNumber: string({
      required_error: 'your phone date is required',
    }).refine(validator.isMobilePhone),
    birthDate: string({ required_error: 'your birth date is required' }),
    gender: nativeEnum(EnumGender, { required_error: 'Gender is required' }),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
  pets: array(petSchema).optional(),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password'
    ),
  }),
});

export const updateUserSchema = object({
  body: object({
    userName: string().optional(),
    firstName: string().optional(),
    lastName: string().optional(),
    email: string().optional(),
    birthDate: string().optional(),
    phoneNumber: string().refine(validator.isMobilePhone).optional(),
    gender: nativeEnum(EnumGender).optional(),
  }),
});

export const updatePasswordSchema = object({
  body: object({
    oldPassword: string({ required_error: 'Password is required' }),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>['body'];
