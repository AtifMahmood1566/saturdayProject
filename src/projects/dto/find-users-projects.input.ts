import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindUserProjectsInput {
  
  @Field()
  readonly _id : string;

}
