import * as mongoose from 'mongoose';
import { Int32 } from 'bson';
const Schema = mongoose.Schema;

export const LevelSchema = new Schema({
    name:{
        type:String
    },
    maxScore:{
        type:Number
    },
    code:{
        type:String
    }
});