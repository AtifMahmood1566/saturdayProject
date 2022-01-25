import { Field, ObjectType } from "@nestjs/graphql";
import { ContributionDto } from "./contribution.dto";

@ObjectType()
export class AddContributionApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field({nullable : true})
    readonly data : ContributionDto;
    
}