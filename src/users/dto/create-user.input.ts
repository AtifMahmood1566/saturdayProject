import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  
  @Field()
  readonly name : string;

  @Field()
  readonly email : string;

}
