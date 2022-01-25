import { InputType, Field, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

@InputType()
export class CreateContributionInput {
  
  @Field(() => ID)
  readonly contributorId : mongoose.Schema.Types.ObjectId;

  @Field(() => ID)
  readonly projectId : mongoose.Schema.Types.ObjectId;

  @Field()
  readonly contribution : number;

}
