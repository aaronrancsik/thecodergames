import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { ParseHeader } from '../tools/headerParser';
const User = mongoose.model('User', UserSchema);

export const checkJWT= (req:Request, res:Response, next:NextFunction)=>{
    
    let jwtPayload = ParseHeader(req);
    if(jwtPayload!==null) {
        res.locals.jwtPayload = jwtPayload;
    }else{
        res.status(401).send();
        return;
    }
    
    const {userId, username, roles} = jwtPayload;
    const newToken = jwt.sign({userId, username, roles},process.env.CUSTOMCONNSTR_Token, {expiresIn:'1h'});
    res.setHeader('auth', newToken);
    next();
}

export const chechAdmin = (req:Request, res:Response, next:NextFunction)=>{

    let jwtPayload = ParseHeader(req);
    if(jwtPayload!==null) {
        res.locals.jwtPayload = jwtPayload;
    }else{
        res.status(401).send();
        return;
    }

    const {userId, username, roles} = jwtPayload;
    try{
        if(roles.includes('admin')){
            const newToken = jwt.sign({userId, username, roles},process.env.CUSTOMCONNSTR_Token, {expiresIn:'1h'});
            res.setHeader('auth', newToken);
            next();
        }else{
            res.send(401);
        }
    }catch(e){
        console.log(e);
        res.status(401).send();
    }
}