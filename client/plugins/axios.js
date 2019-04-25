export default (context) => {
    context.$axios.onRequest((config) => {
        if(context.app.$cookies.get('auth')){
            config.headers.common['auth'] = context.app.$cookies.get('auth');
        }
    });
    context.$axios.onResponse( (response) => {
        if(response && response.headers && response.headers.auth){
            context.app.$cookies.set('auth', response.headers.auth);
        }
        return response;
      });
   }