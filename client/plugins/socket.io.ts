import io from 'socket.io-client';

let socket =  io(process.env.SOCKET_HOST_URL||"");

// export function start(){
//     socket =  io(process.env.SOCKET_HOST_URL||"");
// }

export default socket;

