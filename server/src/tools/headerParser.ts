import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
export function ParseHeader(req:Request):any{
    ;
    const header = <string>req.headers['auth'];
    let jwtPayload;
    try{
        jwtPayload =<any>jwt.verify(header, process.env.CUSTOMCONNSTR_Token);
        //res.locals.jwtPayload = jwtPayload;
    }catch(err){
        return null;
    }
    return jwtPayload;
}