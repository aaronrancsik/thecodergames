import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ParseHeader } from '../tools/headerParser';

const User = mongoose.model('User', UserSchema);

export class UserController{

    static login = async (req:Request, res:Response, next:NextFunction) => {
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(400).json({
                status:0,
                err:'username or pass cant be empty'
            });
            return;
        }
        
        User.findOne({username:username, password:password},(err, user)=>{
            if(err){
                res.status(418).json({
                    status:0,
                    msg:err
                });
                return;
            }
            
            if(!user){
                res.status(401).json({
                    status: 0,
                    msg: "There is no user with the given data"
                });
                return;
            }

            //Sing JWT, valid for plus 1 hour
            const token = jwt.sign({   
                    userId: user._id, 
                    username:  username,
                    roles:user.get('roles')
                },
                process.env.CUSTOMCONNSTR_Token,
                { expiresIn: 3600 }
            );

            res.json({
                status: 1,
                token:token,
                roles:user.get('roles')
            });
            
        });
    }

    public addNewUser (req: Request, res: Response) {   
        let newUser = new User(req.body);
        
        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }    
            res.json(user);
        });
    }

    public getUsers (req: Request, res: Response) {           
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserWithID (req: Request, res: Response) {           
        User.findById(req.params.userId, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser (req: Request, res: Response) {           
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser (req: Request, res: Response) {           
        User.deleteOne({ _id: req.params.userId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!' });
        });
    }

    public checkIn(req: Request, res: Response){
        
        const token = <string>req.headers['auth'];

        let jwtPayload;
        //Try to validate the token and get data
        try{
            //console.log(jwt.decode(token));
            jwtPayload =<any>jwt.verify(token, process.env.CUSTOMCONNSTR_Token);
            //res.locals.jwtPayload= jwtPayload;
        }catch(e)
        {
            res.status(401).send();
            return;
        }

        const {userId, username, roles} = jwtPayload;
        
        User.findById(userId, (err, user) => {
            if(err){
                res.send(err);
            }
            user.set("isOnline", true);
            user.set("lastOnline", Date.now());
            user.save();
            res.json(user);
        });
    }

    public getAllOnline(req: Request, res: Response){
        var query = User.find({isOnline: true},(err,user)=>{
        });
        query.exec((err, val)=>{
            res.json(val);
        })
    }

    public updateCode(req: Request, res: Response){
        
        let jwtPayload = ParseHeader(req);
        if(jwtPayload!==null){
            const {userId, username, roles} = jwtPayload;
            let c = req.body['code'];
            if(c!==undefined && c !== null){
                User.updateOne({_id:userId},{
                    $push:{
                        code:c
                    }
                },(err, raw)=>{
                    if(err){
                        console.log(err);
                        console.log(raw);
                        res.status(400).send();
                    }else{
                        res.json("ok");
                    }
                });
            }else{
                res.status(400).send();
            }
        }else{
            res.status(401).send();
        }
    }

    public loadLatestCode(req: Request, res: Response){
        
        let jwtPayload = ParseHeader(req);
        if(jwtPayload !==null){
            const {userId, username, roles} = jwtPayload;
            User.findById(userId,(err, user) => {
                if(err){
                    console.log(err);
                    res.status(400).send();
                }else{
                    res.json(user['code'][user['code'].length-1]);
                }            
            });
        }else{
            res.status(400).send();
        }
    }


}