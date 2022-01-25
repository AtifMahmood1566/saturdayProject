import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Contribution extends Document{
    
    @Prop()
    contributorId : mongoose.Schema.Types.ObjectId;

    @Prop()
    projectId : mongoose.Schema.Types.ObjectId;

    @Prop()
    contribution : number;

}

export const ContributionSchema = SchemaFactory.createForClass(Contribution);