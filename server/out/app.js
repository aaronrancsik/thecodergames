"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
let sec = "My_super_Secret123";
class User {
    constructor(name) {
        this.code = [];
        this.name = name;
        this.token = "";
        this.scoreLevel = [0, 0, 0, 0, 0];
    }
}
class App {
    constructor() {
        this.aktMap = 0;
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
                //a, controll, viewer
                let a = jwt.decode(socket.handshake.query.token);
                if (a.user != "a") {
                    let aktUser = this.users.find((x) => { return x.name == a.user; });
                    //console.log(aktUser);
                    if (aktUser != undefined) {
                        aktUser.code[this.aktMap] = code.code;
                    }
                    else {
                        console.log("reconect after crash");
                        this.users.push(new User(a.user));
                        let token = jwt.sign({ "user": a.user }, sec);
                        socket.emit("regist", { "suc": true, "token": token });
                        this.io.emit("updateUserList", { "users": this.users });
                        aktUser = this.users.find((x) => { return x.name == a.user; });
                        aktUser.code[this.aktMap] = code.code;
                    }
                    this.io.emit("toViwer", { code: code, name: a.user });
                }
            });
            socket.on("updateScore", (obj) => {
                let aktUser = this.users.find((x) => { return x.name == obj.user; });
                if (aktUser != undefined) {
                    if (aktUser.scoreLevel[obj.map] < obj.score) {
                        aktUser.scoreLevel[obj.map] = obj.score;
                    }
                    this.io.emit("leaderUpdate", { users: this.users });
                }
                //console.log(aktUser);
            });
            socket.on("forceUpdate", (m) => {
                console.log("forceUpdate");
                this.io.emit("forceUpdate", m);
            });
            socket.on("changeMap", (m) => {
                this.io.emit("changeMap", m);
                this.aktMap = m.map;
            });
            socket.on("inspectUser", (m) => {
                console.log("INSPECT");
                let aktUser = this.users.find((x) => { return x.name == m.username; });
                this.io.emit("inspectUser", m);
            });
            socket.on("playGame", (m) => {
                console.log("play");
                this.io.emit("playGame", m);
            });
            socket.on("getUsers", (m) => {
                this.io.emit("updateUserList", { "users": this.users });
            });
            socket.on("regist", (user) => {
                if (this.users.indexOf(user.name) > -1 || user.name == "a" || user.name == "controll" || user.name == "viewer") {
                    socket.emit("regist", { "suc": false });
                }
                else {
                    console.log("registation");
                    this.users.push(new User(user.name));
                    let token = jwt.sign({ "user": user.name }, sec);
                    socket.emit("regist", { "suc": true, "token": token });
                    this.io.emit("updateUserList", { "users": this.users });
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
App.PORT = 80;
exports.App = App;
//# sourceMappingURL=app.js.map