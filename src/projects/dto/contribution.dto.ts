import { Field , ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContributionDto{

    @Field({nullable : true})
    readonly _id : string;

    @Field({nullable : true})
    readonly contributorId : string;

    @Field({nullable : true})
    readonly projectId : string;

    @Field({nullable : true})
    readonly contribution : number;

}