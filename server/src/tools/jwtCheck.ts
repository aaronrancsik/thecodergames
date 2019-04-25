import * as jwt from 'jsonwebtoken';

export function SckMsgToToken(msg:any):string{
    return <string>msg[0];
}

export function jwtVerify(token:string):string|object {
    try{
        return jwt.verify(token, process.env.CUSTOMCONNSTR_Token);
    }catch(err){
        throw err;
    }

    
}