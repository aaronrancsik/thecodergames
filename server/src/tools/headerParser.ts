import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {jwtVerify} from './jwtCheck'
export function ParseHeader(req:Request):any{
    const header = <string>req.headers['auth'];
    let jwtPayload;
    try{
        jwtPayload =<any>jwtVerify(header);
        //res.locals.jwtPayload = jwtPayload;
    }catch(err){
        return null;
    }
    return jwtPayload;
}