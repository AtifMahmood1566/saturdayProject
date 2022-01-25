import { Field , ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProjectDto{

    @Field()
    readonly _id : string;

    @Field()
    readonly name : string;

    @Field()
    readonly startingDate : Date;

    @Field()
    readonly endingDate : Date;

    @Field()
    readonly projectAmount : number;

    @Field()
    readonly approved : boolean;

    @Field({nullable : true})
    createdAt : Date;

    @Field()
    readonly createdBy : string;

}