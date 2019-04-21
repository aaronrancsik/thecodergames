import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
const User = mongoose.model('User', UserSchema);

export const checkJWT= (req:Request, res:Response, next:NextFunction)=>{
    const token = <string>req.headers['auth'];
    let jwtPayload;

    //Try to validate the token and get data
    try{
        //console.log(jwt.decode(token));
        jwtPayload =<any>jwt.verify(token, process.env.CUSTOMCONNSTR_Token);
        res.locals.jwtPayload = jwtPayload;
        

    }catch(err){
        console.log(err);
        res.status(401).send();
        return;
    }
    

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const {userId, username, roles} = jwtPayload;
    const newToken =jwt.sign({userId, username,roles},process.env.CUSTOMCONNSTR_Token,{expiresIn:'1h'});
    res.setHeader('token', newToken);
    
    //Call the next middleware or controller
    next();
}

export const chechAdmin = (req:Request, res:Response, next:NextFunction)=>{
    
    const token =<string>req.headers['auth'];
    let jwtPayload;

    //Try to validate the token and get data
    try{
        //console.log(jwt.decode(token));
        jwtPayload =<any>jwt.verify(token, process.env.CUSTOMCONNSTR_Token);
        //res.locals.jwtPayload= jwtPayload;
        

    }catch(err){
        console.log(err);
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const {userId, username, roles} = jwtPayload;
    //console.log(roles);
    try{
        if(roles.includes('admin')){
            const newToken =jwt.sign({userId, username, roles},process.env.CUSTOMCONNSTR_Token,{expiresIn:'1h'});
            res.setHeader('token', newToken);
            next();
        }else{
            res.send(401);
        }
    }catch(e){
        console.log(e);
        res.status(401).send();
    }

    
    
    
    //Call the next middleware or controller
    
}