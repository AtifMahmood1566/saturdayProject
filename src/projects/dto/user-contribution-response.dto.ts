import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CalculateContributionApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field()
    readonly data : number;
    
}