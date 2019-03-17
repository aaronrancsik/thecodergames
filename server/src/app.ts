import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from "body-parser";
import { Routes } from "./routes/api-router";
import * as mongoose from "mongoose";

export class App {
    public static readonly PORT:number = 4455 || Number(process.env.PORT);
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.CUSTOMCONNSTR_Mongo;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.AddRoutes();
        this.sockets();
        this.listen();
    }

   

    private createApp(): void {
        this.app = express(); 
    }

    private config(): void {
        this.port = process.env.PORT || App.PORT;

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    private createServer(): void {
        this.server = createServer(this.app);
    }
    private AddRoutes(){
        this.routePrv.routes(this.app, this.mongoUrl);
    }
    private sockets(): void {
        this.io = socketIo(this.server);
    }
    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }
    private mongoSetup(): void{
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }
    public getApp(): express.Application {
        return this.app;
    }
}