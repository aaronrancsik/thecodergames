import * as socketIo from 'socket.io';
import * as jwt from 'jsonwebtoken';

export class SocketEvent {
    public middleware = require('socketio-wildcard')();
    
    public events(socket:socketIo.Socket):void{
        let authenticated = false;
        setTimeout(()=> {
            // If the connection hasn't been authenticated in a period of time,
            // disconnect it.
            if (!authenticated) {
              // You'll probably want to log the username or ID here instead.
              console.log(`socket ID "${socket.id}" failed to authenticate, ` +
                `disconnecting`)
        
              socket.emit('unauthorized', {
                message: 'failed to authenticate'
              })
        
              socket.disconnect()
            }
        }, 5000);
        
        socket.on('*', (packet)=> {
            if(!authenticated){
                socket.disconnect();
            }else{
                socket.on('message',(m)=>{
                    //console.log("hi:"+m);
                    socket.emit('message',m);
                });
            }
            
        });

        socket.on('authenticate', function (data) {
            const token = data.token;
        
            // Verify the token.
            jwt.verify(token, process.env.CUSTOMCONNSTR_Token, (err, decoded) => {
              let message;
        
              if (err) {
                // err.message will be something like 'jwt malformed' or 'jwt expired'
                // so you'll want to check that and maybe do something else here
                // depending on the error message. For example, if I get a 'jwt
                // expired' or 'jwt malformed' error, I send that to the client to
                // give it a chance to obtain a fresh token.
                if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
                  message = err.message
                } else {
                  message = 'access denied'
                }
        
                socket.emit('unauthorized', {
                  message: message
                });
        
                // Don't disconnect the client. This gives them time to obtain a fresh
                // token. If they fail to do so, then disconnect timer will eventually
                // disconnect them.
        
                return;
              }
        
              // You'll probably want to log the username or ID here instead. I don't
              // use socket.id at all myself.
              console.log(`authenticated socket ID "${socket.id}"`)
        
              // I don't recommend adding data to the socket object directly. This is
              // just here for brevity. I made a User class that wraps the socket
              // object, for example.
              authenticated = true
              //socket.decodedToken = decoded
            })
        })

        
    }
}