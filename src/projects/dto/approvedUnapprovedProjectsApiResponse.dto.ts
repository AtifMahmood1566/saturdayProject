import { Field, ObjectType } from "@nestjs/graphql";
import { ProjectDto } from "./project.dto";

@ObjectType()
export class ApprovedUnapprovedProjectsApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field(type => [ProjectDto] , {nullable : true})
    readonly data : ProjectDto[];
    
}