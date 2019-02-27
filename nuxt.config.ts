const pkg = require('./package');

export default {
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
    ],
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
  ,css:[
    '~/assets/main.css'
  ]
}
