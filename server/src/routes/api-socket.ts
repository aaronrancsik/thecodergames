import * as socketIo from 'socket.io';
export class SocketEvent {
    public events(socket:socketIo.Socket):void{
        socket.on('message',(m)=>{
            console.log("hi:"+m);
            socket.emit('message',m);
        });
    }
}