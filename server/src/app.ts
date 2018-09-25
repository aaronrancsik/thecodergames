import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as basicAuth from 'express-basic-auth';
import * as jwtAuth  from 'socketio-jwt-auth';
import * as redis from 'redis';

export class App {
    private client = redis.createClient();
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
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

        /*
        this.io.use(jwtAuth.authenticate({
            secret: 'My_super_Secret123',    // required, used to verify the token's signature
            algorithm: 'HS256',        // optional, default to be HS256
            succeedWithoutToken: true
        }, function(payload, done) {
            // you done callback will not include any payload data now
            // if no token was supplied
            if (payload && payload.sub) {
                User.findOne({id: payload.sub}, function(err, user) {
                    if (err) {
                    // return error
                    return done(err);
                    }
                    if (!user) {
                    // return fail with an error message
                    return done(null, false, 'user does not exist');
                    }
                    // return success with a user info
                    return done(null, user);
                });
            } else {
                return done() // in your connection handler user.logged_in will be false
            }
        }));*/
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

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);


            socket.on('codeUpdate', (code:any) => {
                this.io.emit("toViwer",code);
                //console.log(from);
                //console.log('[server](message): %s', (m.code) );
                //this.io.emit('message', m);
            });


            socket.on("playGame", (m:any)=>{
                console.log("play");
                
                this.io.emit("playGame",m);
            })


            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}