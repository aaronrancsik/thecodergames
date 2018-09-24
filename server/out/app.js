"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
class App {
    constructor() {
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
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('codeUpdate', (code) => {
                this.io.emit("toViwer", code);
                //console.log(from);
                //console.log('[server](message): %s', (m.code) );
                //this.io.emit('message', m);
            });
            socket.on("playGame", (m) => {
                console.log("play");
                this.io.emit("playGame", m);
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