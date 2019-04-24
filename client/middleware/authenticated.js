import socket from '~/plugins/socket.io';

export default (context) => {

    if (!context.app.context.app.$cookies.get('auth')) {
      return context.redirect('/login');
    }
    else{
      socket.emit('authenticate', { token: context.app.$cookies.get('auth')});
    }
}
  