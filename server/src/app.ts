import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';


import * as jwt from 'jsonwebtoken';

let sec ="My_super_Secret123";

import {User} from './User';

export class App {
    
    private aktMap:number;

    private users:Array<User>;

    public static readonly PORT:number = 4455 || Number(process.env.PORT);
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.aktMap =0;
        this.users = [];
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        //console.log("PLS CALL THIS LOG"+__dirname+'/../../client/build')
        this.app = express();
        //this.app.use(express.static(__dirname+'/../../client/build'));
        
    }

    private config(): void {
        this.port = process.env.PORT || App.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
        // using middleware
    }



    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.app.get('/', (req, res) => {
            return res.send('Received a GET HTTP method ok 6s');
        });

        this.io.use(function(socket, next){
            
            if (socket.handshake.query && socket.handshake.query.token){
               
              jwt.verify(socket.handshake.query.token, sec, function(err, decoded) {
                
                if(err) {
                    console.log(err);
                    return;
                }

                next();
                
              });
            } else {
                next(new Error('Authentication error'));
            }    
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);


            socket.on('codeUpdate', (code:any) => {
                //a, controll, viewer
                
                let decodedToken:any = jwt.decode(socket.handshake.query.token);

                if(decodedToken.user!="a"){
                    let aktUser:User = this.users.find((x)=>{return x.name==decodedToken.user});
                    //console.log(aktUser);
                    if(aktUser!=undefined){
                        aktUser.code[this.aktMap] = code.code;
                    }else{
                        console.log("reconect after crash");
                        this.users.push(new User(decodedToken.user));
                        let token = jwt.sign({"user": decodedToken.user},sec);
                        socket.emit("regist",{"suc":true, "token": token});
                        this.io.emit("updateUserList",{"users":this.users});
                        aktUser = this.users.find((x)=>{return x.name==decodedToken.user});
                        aktUser.code[this.aktMap] = code.code;
                    }
                
                    this.io.emit("toViwer",{code:code, name:decodedToken.user});
                }
                
                
            });

            socket.on("updateScore",(obj)=>{
                let aktUser:User = this.users.find((x)=>{return x.name==obj.user});
                if(aktUser!=undefined){
                    if(aktUser.scoreLevel[obj.map]<obj.score){
                        aktUser.scoreLevel[obj.map] = obj.score;
                    }
    
                    this.io.emit("leaderUpdate",{users:this.users})
                }
                //console.log(aktUser);
            });

            socket.on("forceUpdate",(m)=>{
                console.log("forceUpdate");
                
                this.io.emit("forceUpdate",m);
            })

            socket.on("changeMap",(m)=>{
                this.io.emit("changeMap",m);
                this.aktMap = m.map;
            });

            socket.on("inspectUser",(m)=>{
                console.log("INSPECT");
               
                let aktUser:User = this.users.find((x)=>{return x.name==m.username});
                
                this.io.emit("inspectUser",m);
            });

            socket.on("playGame", (m:any)=>{
                console.log("play");
                
                this.io.emit("playGame",m);
            });

            socket.on("getUsers",(m)=>{
                this.io.emit("updateUserList",{"users":this.users});
            })

            socket.on("regist",(user:any)=>{
                if(this.users.indexOf(user.name)>-1 || user.name =="a" || user.name =="controll" || user.name =="viewer" ){
                    socket.emit("regist",{"suc":false });
                }else{
                    console.log("registation");
                    
                    this.users.push(new User(user.name));
                    let token = jwt.sign({"user": user.name},sec);
                    socket.emit("regist",{"suc":true, "token": token});
                    this.io.emit("updateUserList",{"users":this.users});
                }
            });


            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}