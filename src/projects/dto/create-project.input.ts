import { InputType, Field, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateProjectInput {
  
  @Field()
  readonly name : string;

  @Field()
  readonly startingDate : Date;

  @Field()
  readonly endingDate : Date;

  @Field()
  readonly projectAmount : number;

  @Field({nullable : true})
  readonly approved : boolean;

  @Field({nullable : true})
  readonly createdAt : Date;

  @Field(() => ID)
  readonly createdBy : ObjectId;

}
