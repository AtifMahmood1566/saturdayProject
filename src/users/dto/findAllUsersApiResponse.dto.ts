import { Field, ObjectType } from "@nestjs/graphql";
import { UserDto } from "./user.dto";

@ObjectType()
export class FindAllUsersApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field(type => [UserDto] , {nullable : true})
    readonly data : UserDto[];
    
}