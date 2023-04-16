import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  LoginInputWithEmail,
  LoginInputWithPhoneNumber,
  LoginResponse,
  SignUpInput,
  UserResponse,
} from '../schemas/user.schema';
import UserService from '../services/user.service';
import { Context } from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => UserResponse)
  async signupUser(@Arg('input') input: SignUpInput) {
    return this.userService.signUpUser(input);
  }

  @Mutation(() => LoginResponse)
  async loginUserWithEmail(
    @Arg('input') loginInput: LoginInputWithEmail,
    @Ctx() ctx: Context
  ) {
    return this.userService.loginUserWithEmail(loginInput, ctx);
  }
  @Mutation(() => LoginResponse)
  async loginUserWithPhoneNumber(
    @Arg('input') loginInput: LoginInputWithPhoneNumber,
    @Ctx() ctx: Context
  ) {
    return this.userService.loginUserWithPhoneNumber(loginInput, ctx);
  }

  @Query(() => UserResponse)
  async getMe(@Ctx() ctx: Context) {
    return this.userService.getMe(ctx);
  }

  @Query(() => LoginResponse)
  async refreshAccessToken(@Ctx() ctx: Context) {
    return this.userService.refreshAccessToken(ctx);
  }

  @Query(() => Boolean)
  async logoutUser(@Ctx() ctx: Context) {
    return this.userService.logoutUser(ctx);
  }
}
