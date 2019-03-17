import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import  {LevelSchema} from './levelModel';

export const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Name is required'
    },
    email: {
        required:'Email is required',
        type: String            
    },
    school: {
        required:'School is required',
        type: String 
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    password:{
        required:'Password is required',
        type:String
    },
    levels:{
        type: [LevelSchema]
    }
});