import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field(() => String)
  userName: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  phoneNumber: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must be at most 32 characters long' })
  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirm: string | undefined;
}

@InputType()
export class LoginInputWithEmail {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: 'Invalid email or password' })
  @MaxLength(32, { message: 'Invalid email or password' })
  @Field(() => String)
  password: string;
}
@InputType()
export class LoginInputWithPhoneNumber {
  @IsEmail()
  @Field(() => String)
  phoneNumber: string;

  @MinLength(8, { message: 'Invalid email or password' })
  @MaxLength(32, { message: 'Invalid email or password' })
  @Field(() => String)
  password: string;
}

@ObjectType()
export class UserData {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  readonly id: string;

  @Field(() => String)
  userName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  role: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class UserResponse {
  @Field(() => String)
  status: string;

  @Field(() => UserData)
  user: UserData;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  status: string;

  @Field(() => String)
  access_token: string;
}
