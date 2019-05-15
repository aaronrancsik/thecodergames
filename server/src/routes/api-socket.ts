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
    
    public events(socket:socketIo.Socket, ioo:socketIo.Server):void{
        

        console.log("connect", socket.id);

        socket.on("ok",(us, id)=>{

          console.log("ok");
          socket.to("users").emit("ok", id);
          //ioo.to(`${id}`).emit("ok");
        });

        socket.on('step',(id,m, auth, callback)=>{  

          if(socket.rooms['users']!==undefined){
            const {userId, username, roles} = <any>jwtVerify(SckMsgToToken(auth));
            socket.to("admins").emit("step",id,username,m);
          }


        });

        socket.on('start',(m)=>{  
          console.log(socket.rooms);
          if(socket.rooms['admins']!==undefined){
            console.log('sent to all users');
            socket.to('users').emit('start', m);
          }
        });

//
        socket.on('createplayers',(m)=>{  
          console.log(socket.rooms);
          if(socket.rooms['admins']!==undefined){
            console.log('sent to all admin');
            socket.to('admins').emit('createplayers', m);
          }
        });

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
          console.log("getOnline IN")
          if(this.checkAdmin(m)){
            console.log("getOnline IN Admin")
            socket.to('users').emit('doCheckIn');
          }else{
            console.log("getOnline IN FAIL");
          }
        });

        socket.on("doCheckIn",(m)=>{
          
          const {username} = <any>jwtVerify(SckMsgToToken(m))
          if(this.checkToken(m)){
            console.log("DO CHECK IN OK")
            socket.server.emit("getOnlineUsers", {username:username , auth:m[0], socketid:socket.id });
          }else{
            console.log("DO CHECK IN FAIL");
          }
        });

        
        
    }
}