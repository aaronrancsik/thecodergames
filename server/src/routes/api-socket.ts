import * as socketIo from 'socket.io';
import * as jwt from 'jsonwebtoken';

export class SocketEvent {
    public middleware = require('socketio-wildcard')();
    
    public events(socket:socketIo.Socket):void{
        let authenticated = false;
        let decodedToken ="";
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
          let a = packet.data[0]!='authenticate';
          if(a===true && !authenticated){
              socket.disconnect();
          }
        });

        socket.on('message',(m)=>{
          if(!authenticated){
            return;
          }
          console.log("hi:"+m);
          socket.emit('message',m);
        });

       

        socket.on('authenticate', function (data) {
            const token = data.token;

            jwt.verify(token, process.env.CUSTOMCONNSTR_Token, (err, decoded) => {
              let message;
        
              if (err) {
                if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
                  message = err.message
                } else {
                  message = 'access denied'
                }
        
                socket.emit('unauthorized', {
                  message: message
                });      
                return;
              }
              console.log(`authenticated socket ID "${socket.id}"`)
              authenticated = true
              decodedToken = decoded;
            })
        })

        
    }
}