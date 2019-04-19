import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    roles:{
        type: [String]
    },
    username: {
        unique:true,
        type: String,
        required: 'Name is required'
    },
    email: {
        unique:true,
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
    code:{
        type:[String]
    },
    maxScore:{
        type:Number
    },
    isOnline:{
        type:Boolean
    },
    lastOnline:{
        type:Date
    }
});