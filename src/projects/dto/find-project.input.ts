import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindProjectInput {
  
  @Field()
  readonly _id : string;

}
