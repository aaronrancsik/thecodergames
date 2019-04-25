import * as socketIo from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { jwtVerify, SckMsgToToken } from '../tools/jwtCheck';



export class SocketEvent {
    public middleware = require('socketio-wildcard')();

    private checkAdmin(m:any):boolean{

      try{
        const {userId, username, roles} = <any>jwtVerify(SckMsgToToken(m));
        if(roles.includes("admin")){
          return true;
        }
      }catch(err){
        console.log(err);
      }
      return false;
    }

    private checkToken(m:any):boolean{
      try{
        jwtVerify(SckMsgToToken(m));
        return true;
      }catch(err){
        console.log(err);
      }
      return false;
    }
    
    public events(socket:socketIo.Socket):void{
        

        console.log("connect", socket.id);

        socket.on('start',(m)=>{  
          console.log(socket.rooms);
          if(socket.rooms['admins']!==undefined){
            console.log('sent to all admin');
            socket.to('admins').emit('start', m);
          }
        })

        socket.on('subAdmins',(m)=>{
          if(this.checkAdmin(m)){
            socket.join('admins');
            console.log("admin  join: ", socket.id);
          }else{
            console.log("admin fali: ",socket.id);
          }
        })

        socket.on('subUsers',(m)=>{
          if(this.checkToken(m)){
            console.log('user join: ',socket.id);
            socket.join("users");
          }else{
            console.log('user fail: ',socket.id);
          }
        })

        socket.on('disconnect',()=>{
          console.log(`socket ID "${socket.id}" disconnected`);
        });

        socket.on('*',(m)=>{
          
            // if(this.checkToken(m)){

            // }else{
            //   console.log("* unauth", socket.id);
            // }
          
        });

        socket.on("getOnlineUsers",(m)=>{
          if(this.checkAdmin(m)){
            socket.to('users').emit('doCheckIn');
          }
        });

        socket.on("doCheckIn",(m)=>{
          const {username} = <any>jwtVerify(SckMsgToToken(m))
          if(this.checkToken(m)){
            socket.server.emit("getOnlineUsers", {username:username , auth:m[0], socketid:socket.id });
          }
        });
        
    }
}