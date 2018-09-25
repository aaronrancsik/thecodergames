"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
const redis = require("redis");
const jwt = require("jsonwebtoken");
let sec = "My_super_Secret123";
class App {
    constructor() {
        this.client = redis.createClient();
        this.users = [];
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
        this.app.use(express.static('../client/public'));
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || App.PORT;
    }
    sockets() {
        this.io = socketIo(this.server);
        // using middleware
    }
    connectDB() {
        this.client.on('error', (err) => {
            console.log(err);
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.use(function (socket, next) {
            if (socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token, sec, function (err, decoded) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    next();
                });
            }
            else {
                next(new Error('Authentication error'));
            }
        });
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('codeUpdate', (code) => {
                let a = jwt.decode(socket.handshake.query.token);
                console.log(a.user);
                this.io.emit("toViwer", code);
            });
            socket.on("playGame", (m) => {
                console.log("play");
                this.io.emit("playGame", m);
            });
            socket.on("regist", (user) => {
                if (this.users.indexOf(user.name) > -1) {
                    socket.emit("regist", { "suc": false });
                }
                else {
                    this.users.push(user.name);
                    let token = jwt.sign({ "user": user.name }, sec);
                    socket.emit("regist", { "suc": true, "token": token });
                }
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    getApp() {
        return this.app;
    }
}
App.PORT = 8080;
exports.App = App;
//# sourceMappingURL=app.js.map