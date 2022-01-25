import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.shcema';
import { UserDto } from './dto/user.dto';
import { CreateUserApiResponseDto } from './dto/createUserApiResponse.dto';
import { FindAllUsersApiResponseDto } from './dto/findAllUsersApiResponse.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateUserApiResponseDto)
  async createUser(@Args('input') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => FindAllUsersApiResponseDto)
  async findAll() {
    return await this.usersService.findAllUsers();
  }

  
}
