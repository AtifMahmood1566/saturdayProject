import { Field, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectDto } from "./project.dto";

@ObjectType()
export class FindUserProjectsApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field(type => [ProjectDto] , {nullable : true})
    readonly data : ProjectDto[];
    
}