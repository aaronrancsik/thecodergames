import socket from '~/plugins/socket.io';
export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.auth) {
      return redirect('/login');
    }else{
      socket.emit('authenticate', {token: store.state.auth ? store.state.auth.accessToken : ""});
    }
  }
  