import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose'

@Schema()
export class Project extends Document{
    
    @Prop()
    name : string;

    @Prop({default : new Date()})
    startingDate : Date;

    @Prop()
    endingDate : Date;

    @Prop({default : 0})
    projectAmount : number;

    @Prop({default : false})
    approved : boolean;

    @Prop({ default : new Date().setUTCHours(0,0,0,0) })
    createdAt : Date;

    @Prop()
    createdBy  : mongoose.Schema.Types.ObjectId;
}

export const projectSchema = SchemaFactory.createForClass(Project);