import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.shcema';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel :Model<User>){}
  
  async create(createUserInput: CreateUserInput) {
    try{
      const user = new this.userModel(createUserInput);
      const createdUser = user.save()
      let ApiResponse = {
        code : 200,
        message : "User is successfully created",
        data : createdUser
      }

      return ApiResponse;
    }
    catch(error)
    {
      let ApiResponse = {
        code : 204,
        message : error,
      }

      return ApiResponse;
    }
    
  }

  async findAllUsers() {
    try{
      const result = await this.userModel.find().exec();

      let ApiResponse = {
        code : 200,
        message : "All users are as follows",
        data : result
      }
      return ApiResponse;
    }
    catch(error)
    {
      let ApiResponse = {
        code : 204,
        message : error
      }
      return ApiResponse;
    }
   
  }

  
}
