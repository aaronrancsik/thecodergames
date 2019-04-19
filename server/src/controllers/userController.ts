import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
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
                token:token
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
        
        let a =[];
        var query = User.find({isOnline: true},(err,user)=>{
        });
        query.exec((err, val)=>{
            res.json(val);
        })
    }


}