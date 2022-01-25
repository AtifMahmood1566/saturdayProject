import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ApprovedUnapporvedProjectsInput {
  
  @Field()
  readonly choice : string;

}
