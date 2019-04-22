export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        if(store.state.auth){
            config.headers.common['auth'] = store.state.auth.accessToken;
        }
    });
    $axios.onResponse( (response) => {
        if(response && response.headers && response.headers.auth){
            store.commit('setAuth',{accessToken : response.headers.auth});
        }
        return response;
      })
   }