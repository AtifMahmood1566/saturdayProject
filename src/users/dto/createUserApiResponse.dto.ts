import { Field, ObjectType } from "@nestjs/graphql";
import { UserDto } from "./user.dto";

@ObjectType()
export class CreateUserApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field()
    readonly data : UserDto;
    
}