import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as basicAuth from 'express-basic-auth';
import * as jwtAuth  from 'socketio-jwt-auth';
import * as redis from 'redis';
import * as jwt from 'jsonwebtoken';
import { constants } from 'os';

let sec ="My_super_Secret123";

export class App {
    
    private users:Array<string>;
    private client = redis.createClient();
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.users = [];
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(express.static('../client/public'));     
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || App.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
        // using middleware
    }
    private connectDB():void{
        this.client.on('error', (err)=>{
            console.log(err);
        })
    }


    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
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
          })
          this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);


            socket.on('codeUpdate', (code:any) => {
                let a:any = jwt.decode(socket.handshake.query.token);
                console.log(a.user);
                
                this.io.emit("toViwer",code);
            });


            socket.on("playGame", (m:any)=>{
                console.log("play");
                
                this.io.emit("playGame",m);
            });

            socket.on("regist",(user:any)=>{
                if(this.users.indexOf(user.name)>-1){
                    socket.emit("regist",{"suc":false });
                }else{
                    this.users.push(user.name);
                    let token = jwt.sign({"user": user.name},sec);
                    socket.emit("regist",{"suc":true, "token": token});
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