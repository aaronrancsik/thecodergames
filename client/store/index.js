import Vuex from 'vuex'
const cookieparser = import('cookie-parser');

export const state=()=>{
  auth:null
}

export const mutations ={
  setAuth(state, auth) {
    state.auth = auth
  }
}

export const actions ={
  // nuxtServerInit({ commit }, { req }) {
  //   let auth = null
  //   if (req.headers.cookie) {
  //     const parsed = cookie----parser.parse(req.headers.cookie)
  //     try {
  //       auth = JSON.parse(parsed.auth)
  //     } catch (err) {
  //       // No valid cookie found
  //     }
  //   }
  //   commit('setAuth', auth)
  // }
}