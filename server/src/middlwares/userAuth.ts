import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJWT= (req:Request, res:Response, next:NextFunction)=>{

    const token = <string>req.headers['auth'];
    let jwtPayload;

    //Try to validate the token and get data
    try{
        jwtPayload =<any>jwt.verify(token, process.env.CUSTOMCONNSTR_Token);
        res.locals.jwtPayload= jwtPayload;
        

    }catch(err){
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const {userId, username} = jwtPayload;
    const newToken =jwt.sign({userId, username},process.env.CUSTOMCONNSTR_Token,{expiresIn:'1h'});
    res.setHeader('token', newToken);
    
    //Call the next middleware or controller
    next();
}