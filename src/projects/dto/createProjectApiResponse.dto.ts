import { Field, ObjectType } from "@nestjs/graphql";
import { ProjectDto } from "./project.dto";

@ObjectType()
export class CreateProjectApiResponseDto{

    @Field()
    readonly code : number;

    @Field()
    readonly message : string;

    @Field({nullable : true})
    readonly data : ProjectDto;
    
}