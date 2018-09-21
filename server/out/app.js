"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var App = /** @class */ (function () {
    function App() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    App.prototype.createApp = function () {
        this.app = express();
        this.app.use(express.static('../client'));
        this.app.all('*', function (req, res) {
            res.redirect('/');
        });
    };
    App.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    App.prototype.config = function () {
        this.port = process.env.PORT || App.PORT;
    };
    App.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    App.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('codeUpdate', function (m) {
                console.log('[server](message): %s', JSON.stringify(m.code));
                //this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    App.prototype.getApp = function () {
        return this.app;
    };
    App.PORT = 8080;
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map