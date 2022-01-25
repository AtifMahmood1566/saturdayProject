import { Field , ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto{

    @Field()
    readonly _id : string;
    
    @Field()
    readonly name : string;

    @Field()
    readonly email : string;

}