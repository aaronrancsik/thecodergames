const pkg = require('./package');

export default {
  server:{
    host: '0.0.0.0'
  },
  srcDir: './client/',
  buildDir: './client/dist',
  generate: {
    dir: './client/stat-dist'
  },
  plugins: [],
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
      { name: 'viewport', content: 'width=device-width, initial scale=1' },
      // { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
  ,css:[
    '~/assets/main.css'
  ],
  build:{
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
