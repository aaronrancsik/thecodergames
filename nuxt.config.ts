const pkg = require('./package');

import * as dotenv from 'dotenv';

export default{
  modules: [
    
    '@nuxtjs/recaptcha',
    'cookie-universal-nuxt',                                                                                                                                                           
    ['@nuxtjs/axios', {                                                                                                                                              
        baseURL: 'https://ukhuigyiuoji.azurewebsites.net/',                                                                                                                            
        browserBaseURL: 'https://ukhuigyiuoji.azurewebsites.net/'                                                                                                                      
                                                                                                                                                                    
    }]                                                                                                                                                               
  ],
  
  recaptcha: {
    siteKey:'6LeiGKAUAAAAACB-0Bt6T51iyuR3g0HXqqgxB4Fa',   
    version: 2    
  },
                                                                                                                                                                     
  axios: {
    // proxyHeaders: false
  },  
  env: {
    SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'https://ukhuigyiuoji.azurewebsites.net/'
  },



  server:{
    host: '0.0.0.0'
  },
  srcDir: './client/',
  buildDir: './client/dist',
  generate: {
    dir: './client/stat-dist'
  },
  plugins: [
    '~/plugins/socket.io',
    '~/plugins/axios',
    '~/plugins/vuetify.js'
  ],
  mode: 'universal',
  head: {
    script:[
      {src:"/blockly/blockly_compressed.js"},
      {src:"/blockly/blocks_compressed.js"},
      {src:"/blockly/javascript_compressed.js"},
      {src:"/blockly/msg/js/hu.js"},
      {src:"/JS-Interpreter/acorn_interpreter.js"},
      {src:"https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"},
    ],
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width', scale:1 },
      // { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'},
      { href:"https://fonts.googleapis.com/css?family=Press+Start+2P", rel:"stylesheet"}
    ]
  }
  ,css:[
    '~/assets/app.styl',
    '~/assets/main.css',
  ],
  build:{
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": false
          }
        }]
      ]
    },
    vendor:['@/plugins/vuetify.js'],
    
    extend(config, {isDev, isClient}){
      config.module.rules.push(
        {
          test: /\.xml$/,
          loader: 'url-loader'
        }
      )
    }
  }
}

