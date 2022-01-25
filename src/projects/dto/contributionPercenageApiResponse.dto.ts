import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContributionPercentageApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field({nullable : true})
    readonly data : string;
    
}