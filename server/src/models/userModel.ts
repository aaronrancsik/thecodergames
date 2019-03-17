import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Enter your name'
    },
    email: {
        type: String            
    },
    school: {
        type: String 
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});