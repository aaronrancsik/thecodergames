"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name) {
        this.code = [];
        this.name = name;
        this.token = "";
        this.scoreLevel = [0, 0, 0, 0, 0];
    }
}
exports.User = User;
