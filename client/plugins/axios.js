export default (context) => {
    //{ $axios, store }
    context.$axios.onRequest((config) => {
        if(context.app.$cookies.get('auth')){
            config.headers.common['auth'] = context.app.$cookies.get('auth');
        }
        // if(store.state.auth){
        //     config.headers.common['auth'] = store.state.auth.accessToken;
        // }
    });
    context.$axios.onResponse( (response) => {
        if(response && response.headers && response.headers.auth){
            
            //store.commit('setAuth',{accessToken : response.headers.auth});
            context.app.$cookies.set('auth', response.headers.auth);
        }
        return response;
      })
   }