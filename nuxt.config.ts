const pkg = require('./package');

import * as dotenv from 'dotenv';

export default{
  modules: [                                                                                                                                                           
    ['@nuxtjs/axios', {                                                                                                                                              
        baseURL: 'https://proggame.azurewebsites.net/',                                                                                                                            
        browserBaseURL: 'https://proggame.azurewebsites.net/'                                                                                                                      
                                                                                                                                                                    
    }]                                                                                                                                                               
  ],                                                                                                                                                                   
                                                                                                                                                                     
  axios: {
    // proxyHeaders: false
  },  
  env: {
    SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'https://proggame.azurewebsites.net/'
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

      {src:"/JS-Interpreter/acorn_interpreter.js"}
    ],
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width', scale:1 },
      // { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'}
    ]
  }
  ,css:[
    '~/assets/app.styl',
    '~/assets/main.css',
  ],
  build:{
    vendor:['vuetify'],
    extend(config, {isDev, isClient}){
      // if(isClient){
      //   if(isDev){
      //     config.resolve.alias['api']='https://proggame.azurewebsites.net';
      //     console.log(config.resolve.alias);
      //   }else{
      //     config.resolve.alias['api']='http://localhost:4455';
      //     console.log(config.resolve.alias);
      //   }
      // }
      //config.modules.push('@nuxtjs/axios');
      // console.log(config.module);

      config.module.rules.push(
        {
          test: /\.xml$/,
          loader: 'url-loader'
        }
      )
    }
  }
}

